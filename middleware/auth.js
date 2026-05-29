/**
 * Route Protection Middleware
 * Usage: router.get('/profile', isAuthenticated, controller.profile);
 */

// Require user to be logged in
exports.isAuthenticated = (req, res, next) => {
  if (req.session && req.session.userId) {
