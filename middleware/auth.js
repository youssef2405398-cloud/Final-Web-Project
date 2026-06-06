/**
 * Route Protection Middleware
 * Usage: router.get('/profile', isAuthenticated, controller.profile);
 */

// Require user to be logged in
exports.isAuthenticated = (req, res, next) => {
  if (req.session && req.session.userId) {
/**
 * Route Protection Middleware
 * Usage: router.get('/profile', isAuthenticated, controller.profile);
 */

// Require user to be logged in
exports.isAuthenticated = (req, res, next) => {
  if (req.session && req.session.userId) {
    return next();
  }
  req.session.toast = { type: 'error', message: 'Please log in to access this page.' };
  res.redirect('/login');
};

// Restrict access to admin role only
exports.isAdmin = (req, res, next) => {
  if (req.session && req.session.role === 'admin') {
    return next();
  }
  req.session.toast = { type: 'error', message: 'Access denied. Admin privileges required.' };
  res.redirect('/');
};

// Redirect logged-in users away from login/signup pages
exports.guestOnly = (req, res, next) => {
  if (req.session && req.session.userId) {
    return res.redirect('/');
  }
  next();
};