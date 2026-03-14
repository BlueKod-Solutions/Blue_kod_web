// src/middleware/validate.js
const { body, validationResult } = require('express-validator');

/**
 * Validation rules for POST /api/contact
 */
const contactValidationRules = [
  body('firstName')
    .trim()
    .notEmpty()
    .withMessage('First name is required')
    .isLength({ min: 2, max: 50 })
    .withMessage('First name must be between 2 and 50 characters')
    .matches(/^[a-zA-Z\s'-]+$/)
    .withMessage('First name can only contain letters, spaces, hyphens and apostrophes'),

  body('lastName')
    .optional({ nullable: true, checkFalsy: true })
    .trim()
    .isLength({ max: 50 })
    .withMessage('Last name cannot exceed 50 characters'),

  body('email')
    .trim()
    .notEmpty()
    .withMessage('Email address is required')
    .isEmail()
    .withMessage('Please provide a valid email address')
    .normalizeEmail(),

  body('service')
    .optional({ nullable: true, checkFalsy: true })
    .isIn([
      'Website Development',
      'AI Development',
      'Logo & Brand Design',
      'Full Package',
      'Something Custom',
      '',
    ])
    .withMessage('Invalid service selection'),

  body('message')
    .trim()
    .notEmpty()
    .withMessage('Message is required')
    .isLength({ min: 10, max: 2000 })
    .withMessage('Message must be between 10 and 2000 characters'),
];

/**
 * Middleware that checks validation results and responds 422 on failure
 */
function handleValidationErrors(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({
      success: false,
      message: 'Validation failed',
      errors:  errors.array().map(e => ({ field: e.path, message: e.msg })),
    });
  }
  next();
}

module.exports = { contactValidationRules, handleValidationErrors };
