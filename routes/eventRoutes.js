const express = require('express');
const router = express.Router();
const eventCtrl = require('../controllers/eventController');
const { isAuthenticated } = require('../middleware/auth');
const { validateEvent, handleValidationErrors, validateIdParam } = require('../middleware/validation');
const { asyncHandler } = require('../middleware/errorHandler');

// Public
router.get('/', asyncHandler(eventCtrl.getHome));
router.get('/events', asyncHandler(eventCtrl.getEvents));
router.get('/events/:id', validateIdParam, handleValidationErrors, asyncHandler(eventCtrl.getEventDetail));

// Protected
router.get('/create-event', isAuthenticated, eventCtrl.getCreateEvent);
router.post('/create-event', isAuthenticated, validateEvent, handleValidationErrors, asyncHandler(eventCtrl.postCreateEvent));

module.exports = router;