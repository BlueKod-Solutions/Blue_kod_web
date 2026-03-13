// src/routes/contact.routes.js
const express  = require('express');
const rateLimit = require('express-rate-limit');
const {
  createContact,
  getAllContacts,
  getContactById,
  updateContactStatus,
  deleteContact,
  getStats,
} = require('../controllers/contact.controller');
const { contactValidationRules, handleValidationErrors } = require('../middleware/validate');

const router = express.Router();

// ── Rate limiter: max 10 form submissions per IP per 15 minutes ──
const submitLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max:      10,
  message: {
    success: false,
    message: 'Too many submissions from this IP. Please try again after 15 minutes.',
  },
  standardHeaders: true,
  legacyHeaders:   false,
});

// ── Routes ────────────────────────────────────────────────────────

/**
 * @route  POST /api/contact
 * @desc   Submit contact form → saved to MongoDB
 * @access Public
 */
router.post(
  '/',
  submitLimiter,
  contactValidationRules,
  handleValidationErrors,
  createContact
);

/**
 * @route  GET /api/contact/stats
 * @desc   Get submission counts grouped by status + recent 5
 * @access Admin (protect in production)
 */
router.get('/stats', getStats);

/**
 * @route  GET /api/contact
 * @desc   List all submissions with pagination & filtering
 * @access Admin (protect in production)
 * @query  page, limit, status, email, sort
 */
router.get('/', getAllContacts);

/**
 * @route  GET /api/contact/:id
 * @desc   Get single submission by MongoDB ObjectId
 * @access Admin
 */
router.get('/:id', getContactById);

/**
 * @route  PATCH /api/contact/:id/status
 * @desc   Update status: new | read | replied | archived
 * @access Admin
 */
router.patch('/:id/status', updateContactStatus);

/**
 * @route  DELETE /api/contact/:id
 * @desc   Delete a single submission
 * @access Admin
 */
router.delete('/:id', deleteContact);

module.exports = router;
