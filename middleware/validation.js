const { body, param } = require('express-validator');

// Signup form validation
exports.validateSignup = [
  body('

    const { body, param } = require('express-validator');

// Signup form validation
exports.validateSignup = [
  body('name').trim().isLength({ min: 2, max: 50 }).withMessage('Name must be 2-50 characters'),
  body('email').isEmail().normalizeEmail().withMessage('Enter a valid email address'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
  body('role').optional().isIn(['student', 'admin']).withMessage('Invalid role selected'),
];

// Login form validation
exports.validateLogin = [
  body('email').isEmail().normalizeEmail().withMessage('Enter a valid email address'),
  body('password').notEmpty().withMessage('Password is required'),
];

// Event creation validation
exports.validateEvent = [
  body('title').trim().isLength({ min: 3, max: 100 }).withMessage('Title must be 3-100 characters'),
  body('organizer').trim().notEmpty().withMessage('Organizer name is required'),
  body('date').isISO8601().withMessage('Enter a valid date (YYYY-MM-DD)'),
  body('time').matches(/^([01]\d|2[0-3]):([0-5]\d)$/).withMessage('Enter valid time (HH:MM)'),
  body('location').trim().notEmpty().withMessage('Location is required'),
  body('category').isIn(['academic', 'sports', 'cultural', 'social', 'workshop']).withMessage('Select a valid category'),
  body('maxAttendees').optional().isInt({ min: 1, max: 500 }).withMessage('Attendees must be 1-500'),
  body('description').trim().isLength({ min: 10, max: 2000 }).withMessage('Description must be 10-2000 characters'),
];

// RSVP form validation
exports.validateRSVP = [
  body('guestCount').isInt({ min: 1, max: 5 }).withMessage('Guests must be between 1 and 5'),
];

// MongoDB ID parameter validation
exports.validateIdParam = [
  param('id').isMongoId().withMessage('Invalid record ID'),
];