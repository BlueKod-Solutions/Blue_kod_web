// src/controllers/contact.controller.js
const Contact = require('../models/Contact');
const { Resend } = require("resend");

// ✅ Initialize Resend
const resend = new Resend(process.env.RESEND_API_KEY);

// ─────────────────────────────────────────────
//  EMAIL FUNCTIONS
// ─────────────────────────────────────────────
async function sendLeadNotification(data) {
  await resend.emails.send({
    from: "BlueKod Leads <admin@bluekod.com>",
    to: [
      "manojnaika2003@gmail.com",
      "kpshashank.k2@gmail.com",
      "padmaprasadchowta@gmail.com",
      "shettysanath075@gmail.com"
    ],
    subject: "🚀 New Lead Generated",
    html: `
      <div style="font-family: Arial, sans-serif; color:#333;">
        <h2 style="color:#16a34a;">🚀 New Lead Alert!</h2>

        <p>A new potential client just reached out via the website.</p>

        <div style="background:#f9fafb; padding:15px; border-radius:10px;">
          <p><strong>👤 Name:</strong> ${data.firstName} ${data.lastName}</p>
          <p><strong>📧 Email:</strong> ${data.email}</p>
          <p><strong>🛠 Service:</strong> ${data.service || 'Not specified'}</p>

          <p><strong>💬 Message:</strong></p>
          <p style="background:#fff; padding:10px; border-left:4px solid #4f46e5;">
            ${data.message}
          </p>
        </div>

        <p style="margin-top:15px;">👉 Follow up quickly — hot lead! 🔥</p>
      </div>
    `,
  });
}

async function sendAutoReply(data) {
  await resend.emails.send({
    from: "BlueKod Team <admin@bluekod.com>",
    to: data.email,
    subject: "Thanks for contacting BlueKod!",
    html: `
      <div style="font-family: Arial, sans-serif; line-height:1.6; color:#333;">
        <h2 style="color:#4f46e5;">Hey ${data.firstName} 👋</h2>

        <p>Thanks for reaching out to <strong>BlueKod</strong> 🚀</p>

        <p>Your message has been received and our team is reviewing it.</p>

        <p style="background:#f3f4f6; padding:12px; border-radius:8px;">
          ⏳ We usually respond within <strong>24 hours</strong>
        </p>

        <p>We’ll get back to you shortly!</p>

        <br/>

        <p>
          Cheers,<br/>
          <strong>Team BlueKod 💙</strong>
        </p>
      </div>
    `,
  });
}

// ─────────────────────────────────────────────
//  POST /api/contact
// ─────────────────────────────────────────────
async function createContact(req, res) {
  try {
    const { firstName, lastName, email, service, message } = req.body;

    const contactData = {
      firstName,
      lastName: lastName || '',
      email: email.toLowerCase().trim(),
      service: service || '',
      message,
      ipAddress: req.ip || req.headers['x-forwarded-for'] || '',
      userAgent: req.headers['user-agent'] || '',
    };

    const contact = new Contact(contactData);
    const saved = await contact.save();

    console.log(`📩 New contact saved | id: ${saved._id} | from: ${saved.email}`);

    // ✅ Send emails in background (no blocking)
    setImmediate(async () => {
      try {
        await sendLeadNotification(contactData);
        await sendAutoReply(contactData);
        console.log("✅ Emails sent successfully");
      } catch (err) {
        console.error("❌ Email error:", err);
      }
    });

    return res.status(201).json({
      success: true,
      message: 'Your message has been received! We will get back to you within 24 hours.',
      data: {
        id: saved._id,
        fullName: saved.fullName,
        email: saved.email,
        service: saved.service,
        createdAt: saved.createdAt,
      },
    });

  } catch (error) {
    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map(e => e.message);
      return res.status(422).json({
        success: false,
        message: 'Validation failed',
        errors,
      });
    }

    console.error('createContact error:', error);
    return res.status(500).json({
      success: false,
      message: 'Server error. Please try again later.',
    });
  }
}

// ─────────────────────────────────────────────
//  OTHER CONTROLLERS (unchanged)
// ─────────────────────────────────────────────

async function getAllContacts(req, res) {
  try {
    const { page = 1, limit = 20, status, email, sort = 'desc' } = req.query;

    const filter = {};
    if (status) filter.status = status;
    if (email) filter.email = { $regex: email, $options: 'i' };

    const sortOrder = sort === 'asc' ? 1 : -1;
    const skip = (Number(page) - 1) * Number(limit);

    const [contacts, total] = await Promise.all([
      Contact.find(filter)
        .sort({ createdAt: sortOrder })
        .skip(skip)
        .limit(Number(limit))
        .lean(),
      Contact.countDocuments(filter),
    ]);

    return res.status(200).json({
      success: true,
      data: contacts,
      meta: {
        total,
        page: Number(page),
        limit: Number(limit),
        totalPages: Math.ceil(total / Number(limit),
        ),
      },
    });
  } catch (error) {
    console.error('getAllContacts error:', error);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
}

async function getContactById(req, res) {
  try {
    const contact = await Contact.findById(req.params.id).lean();

    if (!contact) {
      return res.status(404).json({ success: false, message: 'Contact not found' });
    }

    return res.status(200).json({ success: true, data: contact });
  } catch (error) {
    if (error.name === 'CastError') {
      return res.status(400).json({ success: false, message: 'Invalid contact ID format' });
    }
    console.error('getContactById error:', error);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
}

async function updateContactStatus(req, res) {
  try {
    const { status } = req.body;
    const validStatuses = ['new', 'read', 'replied', 'archived'];

    if (!validStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: `Status must be one of: ${validStatuses.join(', ')}`,
      });
    }

    const contact = await Contact.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true }
    ).lean();

    if (!contact) {
      return res.status(404).json({ success: false, message: 'Contact not found' });
    }

    return res.status(200).json({
      success: true,
      message: `Status updated to "${status}"`,
      data: contact,
    });
  } catch (error) {
    console.error('updateContactStatus error:', error);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
}

async function deleteContact(req, res) {
  try {
    const contact = await Contact.findByIdAndDelete(req.params.id);

    if (!contact) {
      return res.status(404).json({ success: false, message: 'Contact not found' });
    }

    return res.status(200).json({
      success: true,
      message: 'Contact deleted successfully',
      data: { id: req.params.id },
    });
  } catch (error) {
    console.error('deleteContact error:', error);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
}

async function getStats(req, res) {
  try {
    const [statusCounts, total, recent] = await Promise.all([
      Contact.aggregate([
        { $group: { _id: '$status', count: { $sum: 1 } } },
        { $sort: { _id: 1 } },
      ]),
      Contact.countDocuments(),
      Contact.find().sort({ createdAt: -1 }).limit(5).lean(),
    ]);

    const byStatus = statusCounts.reduce((acc, item) => {
      acc[item._id] = item.count;
      return acc;
    }, {});

    return res.status(200).json({
      success: true,
      data: {
        total,
        byStatus,
        recentSubmissions: recent,
      },
    });
  } catch (error) {
    console.error('getStats error:', error);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
}

module.exports = {
  createContact,
  getAllContacts,
  getContactById,
  updateContactStatus,
  deleteContact,
  getStats,
};