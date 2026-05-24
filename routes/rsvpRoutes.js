const express = require('express');
const router = express.Router();
const rsvpCtrl = require('../controllers/rsvpController');
const { isAuthenticated } = require('../middleware/auth');
const { validateRSVP, validateIdParam } = require('../middleware/validation');
const { asyncHandler, handleValidationErrors } = require('../middleware/errorHandler');

router.get('/rsvp/:id', isAuthenticated, validateIdParam, handleValidationErrors, asyncHandler(rsvpCtrl.getRSVPForm));
router.post('/rsvp/:id', isAuthenticated, validateIdParam, handleValidationErrors, validateRSVP, handleValidationErrors, asyncHandler(rsvpCtrl.postRSVP));
router.post('/cancel-rsvp/:id', isAuthenticated, validateIdParam, handleValidationErrors, asyncHandler(rsvpCtrl.cancelRSVP));

module.exports = router;