const express = require('express');
const router = express.Router();
const adminCtrl = require('../controllers/adminController');
const { isAuthenticated, isAdmin } = require('../middleware/auth');
const { validateIdParam } = require('../middleware/validation');
const { asyncHandler, handleValidationErrors } = require('../middleware/errorHandler');

// All admin routes require authentication + admin role
router.get('/admin', isAuthenticated, isAdmin, asyncHandler(adminCtrl.getDashboard));
router.get('/admin/users', isAuthenticated, isAdmin, asyncHandler(adminCtrl.getAllUsers));

router.post('/admin/events/:id/approve', isAuthenticated, isAdmin, validateIdParam, handleValidationErrors, asyncHandler(adminCtrl.approveEvent));
router.post('/admin/events/:id/reject', isAuthenticated, isAdmin, validateIdParam, handleValidationErrors, asyncHandler(adminCtrl.rejectEvent));

module.exports = router;