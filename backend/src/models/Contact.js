// src/models/Contact.js
const mongoose = require('mongoose');

/**
 * Contact schema – stores every form submission from the BlueKod website.
 * The document is intentionally lean; all fields are stored as plain
 * JSON-compatible types so they can be exported / queried easily.
 */
const contactSchema = new mongoose.Schema(
  {
    // ── Personal details ──────────────────────────────
    firstName: {
      type: String,
      required: [true, 'First name is required'],
      trim: true,
      minlength: [2, 'First name must be at least 2 characters'],
      maxlength: [50, 'First name cannot exceed 50 characters'],
    },
    lastName: {
      type: String,
      trim: true,
      maxlength: [50, 'Last name cannot exceed 50 characters'],
      default: '',
    },
    email: {
      type: String,
      required: [true, 'Email address is required'],
      trim: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email address'],
    },

    // ── Enquiry details ───────────────────────────────
    service: {
      type: String,
      enum: {
        values: [
          'Website Development',
          'AI Development',
          'Logo & Brand Design',
          'Full Package',
          'Something Custom',
          '',
        ],
        message: '{VALUE} is not a valid service option',
      },
      default: '',
    },
    message: {
      type: String,
      required: [true, 'Message is required'],
      trim: true,
      minlength: [10, 'Message must be at least 10 characters'],
      maxlength: [2000, 'Message cannot exceed 2000 characters'],
    },

    // ── Meta ──────────────────────────────────────────
    status: {
      type: String,
      enum: ['new', 'read', 'replied', 'archived'],
      default: 'new',
    },
    ipAddress: {
      type: String,
      default: '',
    },
    userAgent: {
      type: String,
      default: '',
    },
  },
  {
    // Adds createdAt and updatedAt automatically
    timestamps: true,

    // Ensure the JSON output is clean
    toJSON: {
      virtuals: true,
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
        return ret;
      },
    },
  }
);

// ── Indexes ───────────────────────────────────────────
contactSchema.index({ email: 1 });
contactSchema.index({ status: 1 });
contactSchema.index({ createdAt: -1 });

// ── Virtual: full name ────────────────────────────────
contactSchema.virtual('fullName').get(function () {
  return this.lastName
    ? `${this.firstName} ${this.lastName}`
    : this.firstName;
});

const Contact = mongoose.model('Contact', contactSchema);

module.exports = Contact;
