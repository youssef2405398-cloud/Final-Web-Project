const express = require('express');
const router = express.Router();
const eventCtrl = require('../controllers/eventController');
const { isAuthenticated } = require('../middleware/auth');
const { validateEvent } = require('../middleware/validation');
const { handleValidationErrors } = require('../middleware/errorHandler');
const upload = require('../middleware/upload');

router.get('/', eventCtrl.getHome);
router.get('/events', eventCtrl.getEvents);
router.get('/create-event', isAuthenticated, eventCtrl.getCreateEvent);
router.post('/create-event', isAuthenticated, upload.single('image'), validateEvent, handleValidationErrors, eventCtrl.postCreateEvent);
router.get('/events/:id', eventCtrl.getEventDetail);

module.exports = router;