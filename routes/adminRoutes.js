const express = require('express');
const router = express.Router();
const adminCtrl = require('../controllers/adminController');
const { isAuthenticated, isAdmin } = require('../middleware/auth');
const { validateIdParam } = require('../middleware/validation');
const { handleValidationErrors } = require('../middleware/errorHandler');

router.get('/admin', isAuthenticated, isAdmin, adminCtrl.getDashboard);
router.post('/admin/events/:id/approve', isAuthenticated, isAdmin, validateIdParam, handleValidationErrors, adminCtrl.approveEvent);
router.post('/admin/events/:id/reject', isAuthenticated, isAdmin, validateIdParam, handleValidationErrors, adminCtrl.rejectEvent);
router.get('/admin/users', isAuthenticated, isAdmin, adminCtrl.getAllUsers);

module.exports = router;