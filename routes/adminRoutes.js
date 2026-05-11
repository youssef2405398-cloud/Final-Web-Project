const express = require('express');
const router = express.Router();
const adminCtrl = require('../controllers/adminController');
const { isAuthenticated, isAdmin } = require('../middleware/auth');
const { validateIdParam, handleValidationErrors } = require('../middleware/validation');
const { asyncHandler } = require('../middleware/errorHandler');

// All admin routes require authentication + admin role
router.use(isAuthenticated, isAdmin);

router.get('/admin', asyncHandler(adminCtrl.getDashboard));
router.get('/admin/users', asyncHandler(adminCtrl.getAllUsers));

router.post('/admin/events/:id/approve', validateIdParam, handleValidationErrors, asyncHandler(adminCtrl.approveEvent));
router.post('/admin/events/:id/reject', validateIdParam, handleValidationErrors, asyncHandler(adminCtrl.rejectEvent));

module.exports = router;