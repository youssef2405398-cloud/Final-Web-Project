const express = require('express');
const router = express.Router();
const adminCtrl = require('../controllers/adminController');
const { isAuthenticated, isAdmin } = require('../middleware/auth');
const { validateIdParam } = require('../middleware/validation');
const { asyncHandler, handleValidationErrors } = require('../middleware/errorHandler');

