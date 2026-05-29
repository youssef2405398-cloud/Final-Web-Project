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