const express = require('express');
const router = express.Router();
const eventCtrl = require('../controllers/eventController');
const { isAuthenticated } = require('../middleware/auth');
const { validateEvent, validateIdParam } = require('../middleware/validation');
const { asyncHandler, handleValidationErrors } = require('../middleware/errorHandler');

// Public
router.get('/', asyncHandler(eventCtrl.getHome));
router.get('/events', asyncHandler(eventCtrl.getEvents));
router.get('/events/:id', validateIdParam, handleValidationErrors, asyncHandler(eventCtrl.getEventDetail));

// Protected
router.get('/create-event', isAuthenticated, eventCtrl.getCreateEvent);
const upload = require('../middleware/upload');
router.post('/create-event', isAuthenticated, upload.single('image'), validateEvent, handleValidationErrors, asyncHandler(eventCtrl.postCreateEvent));

module.exports = router;