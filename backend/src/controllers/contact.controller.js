// src/controllers/contact.controller.js
const Contact = require('../models/Contact');

// ─────────────────────────────────────────────
//  POST /api/contact
//  Save a new contact form submission
// ─────────────────────────────────────────────
async function createContact(req, res) {
  try {
    const { firstName, lastName, email, service, message } = req.body;

    // Build the document
    const contactData = {
      firstName,
      lastName:  lastName  || '',
      email:     email.toLowerCase().trim(),
      service:   service   || '',
      message,
      ipAddress: req.ip || req.headers['x-forwarded-for'] || '',
      userAgent: req.headers['user-agent'] || '',
    };

    const contact = new Contact(contactData);
    const saved   = await contact.save();

    console.log(`📩  New contact saved | id: ${saved._id} | from: ${saved.email}`);

    return res.status(201).json({
      success: true,
      message: 'Your message has been received! We will get back to you within 24 hours.',
      data: {
        id:        saved._id,
        fullName:  saved.fullName,
        email:     saved.email,
        service:   saved.service,
        createdAt: saved.createdAt,
      },
    });
  } catch (error) {
    // Mongoose validation error
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
//  GET /api/contact
//  List all submissions (admin use)
//  Supports: ?page=1&limit=20&status=new&email=&sort=desc
// ─────────────────────────────────────────────
async function getAllContacts(req, res) {
  try {
    const {
      page   = 1,
      limit  = 20,
      status,
      email,
      sort   = 'desc',
    } = req.query;

    const filter = {};
    if (status) filter.status = status;
    if (email)  filter.email  = { $regex: email, $options: 'i' };

    const sortOrder = sort === 'asc' ? 1 : -1;
    const skip      = (Number(page) - 1) * Number(limit);

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
      data:    contacts,
      meta: {
        total,
        page:       Number(page),
        limit:      Number(limit),
        totalPages: Math.ceil(total / Number(limit)),
      },
    });
  } catch (error) {
    console.error('getAllContacts error:', error);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
}

// ─────────────────────────────────────────────
//  GET /api/contact/:id
//  Get a single submission by ID
// ─────────────────────────────────────────────
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

// ─────────────────────────────────────────────
//  PATCH /api/contact/:id/status
//  Update the status of a submission
// ─────────────────────────────────────────────
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
      data:    contact,
    });
  } catch (error) {
    console.error('updateContactStatus error:', error);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
}

// ─────────────────────────────────────────────
//  DELETE /api/contact/:id
//  Delete a single submission
// ─────────────────────────────────────────────
async function deleteContact(req, res) {
  try {
    const contact = await Contact.findByIdAndDelete(req.params.id);

    if (!contact) {
      return res.status(404).json({ success: false, message: 'Contact not found' });
    }

    return res.status(200).json({
      success: true,
      message: 'Contact deleted successfully',
      data:    { id: req.params.id },
    });
  } catch (error) {
    console.error('deleteContact error:', error);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
}

// ─────────────────────────────────────────────
//  GET /api/contact/stats
//  Summary counts grouped by status
// ─────────────────────────────────────────────
async function getStats(req, res) {
  try {
    const [statusCounts, total, recent] = await Promise.all([
      Contact.aggregate([
        { $group: { _id: '$status', count: { $sum: 1 } } },
        { $sort:  { _id: 1 } },
      ]),
      Contact.countDocuments(),
      Contact.find().sort({ createdAt: -1 }).limit(5).lean(),
    ]);

    // Convert array to object: { new: 3, read: 10, ... }
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
