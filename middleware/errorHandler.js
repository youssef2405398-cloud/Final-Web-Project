const { validationResult } = require('express-validator');

/**
 * Async Wrapper
 * Eliminates try/catch in every route handler
 * Usage: router.get('/', asyncHandler(controller.home));
 */
exports.asyncHandler = (fn) => (req, res, next) => {


  // API/AJAX requests → JSON response
  if (req.xhr || req.headers.accept?.includes('application/json')) {
    return res.status(statusCode).json({ success: false, message });
  }

  // Standard web requests → redirect with toast
  req.session.toast = { type: 'error', message };
  res.redirect(req.get('Referrer') || '/');
};

/**
 * 404 Not Found Handler
 */
exports.notFound = (req, res) => {
  res.status(404).render('error', {
    title: 'Not Found',
    code: 404,
    message: 'The page you\'re looking for doesn\'t exist.',
    user: req.session
  });
};

const { validationResult } = require('express-validator');

/**
 * Async Wrapper
 * Eliminates try/catch in every route handler
 * Usage: router.get('/', asyncHandler(controller.home));
 */
exports.asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

/**
 * Validation Error Handler
 * Checks express-validator results & redirects with toast
 */
exports.handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    req.session.toast = { type: 'error', message: errors.array()[0].msg };
    return res.redirect(req.get('Referrer') || '/');
  }
  next();
};

/**
 * Global Error Handler
 * Catches all unhandled errors & formats response
 */
exports.globalErrorHandler = (err, req, res, next) => {
  console.error('🔥 Server Error:', err.stack || err);

  // MongoDB/Mongoose error mapping
  if (err.name === 'ValidationError') {
    err.message = Object.values(err.errors).map(e => e.message).join(', ');
    err.statusCode = 400;
  } else if (err.name === 'CastError') {
    err.message = `Invalid ID format: ${err.value}`;
    err.statusCode = 400;
  } else if (err.code === 11000) {
    err.message = 'Duplicate entry detected';
    err.statusCode = 400;
  }

  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';

  // API/AJAX requests → JSON response
  if (req.xhr || req.headers.accept?.includes('application/json')) {
    return res.status(statusCode).json({ success: false, message });
  }

  // Standard web requests → redirect with toast
  req.session.toast = { type: 'error', message };
  res.redirect(req.get('Referrer') || '/');
};

/**
 * 404 Not Found Handler
 */
exports.notFound = (req, res) => {
  res.status(404).render('error', {
    title: 'Not Found',
    code: 404,
    message: 'The page you\'re looking for doesn\'t exist.',
    user: req.session
  });
};