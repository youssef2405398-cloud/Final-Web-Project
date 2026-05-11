const express = require('express');
const router = express.Router();
const rsvpCtrl = require('../controllers/rsvpController');
const { isAuthenticated } = require('../middleware/auth');
const { validateRSVP, handleValidationErrors, validateIdParam } = require('../middleware/validation');
const { asyncHandler } = require('../middleware/errorHandler');

router.use(isAuthenticated);

router.get('/rsvp/:id', validateIdParam, handleValidationErrors, asyncHandler(rsvpCtrl.getRSVPForm));
router.post('/rsvp/:id', validateIdParam, handleValidationErrors, validateRSVP, handleValidationErrors, asyncHandler(rsvpCtrl.postRSVP));
router.post('/cancel-rsvp/:id', validateIdParam, handleValidationErrors, asyncHandler(rsvpCtrl.cancelRSVP));

module.exports = router;