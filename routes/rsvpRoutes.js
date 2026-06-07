const express = require('express');
const router = express.Router();
const rsvpCtrl = require('../controllers/rsvpController');
const { isAuthenticated } = require('../middleware/auth');
const { validateRSVP, validateIdParam } = require('../middleware/validation');
const { handleValidationErrors } = require('../middleware/errorHandler');

router.get('/rsvp/:id', isAuthenticated, validateIdParam, handleValidationErrors, rsvpCtrl.getRSVPForm);
router.post('/rsvp/:id', isAuthenticated, validateIdParam, validateRSVP, handleValidationErrors, rsvpCtrl.postRSVP);
router.post('/cancel-rsvp/:id', isAuthenticated, validateIdParam, handleValidationErrors, rsvpCtrl.cancelRSVP);

module.exports = router;
