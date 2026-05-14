const User = require('../models/User');
const bcrypt = require('bcryptjs');

exports.getLogin = (req, res) => {
  if (req.session.userId) return res.redirect('/');
  res.render('login', { title: 'Login' });
};

exports.getSignup = (req, res) => {
  if (req.session.userId) return res.redirect('/');
  res.render('signup', { title: 'Sign Up' });
};

exports.postSignup = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    
    const existing = await User.findOne({ email });
    if (existing) {
      req.session.toast = { type: 'error', message: 'Email already registered' };
      return res.redirect('/signup');
    }

    const newUser = await User.create({ name, email, password, role: role || 'student' });
    
    req.session.userId = newUser._id.toString();
    req.session.role = newUser.role;
    req.session.name = newUser.name;
    
    req.session.toast = { type: 'success', message: `Welcome, ${newUser.name}!` };
    res.redirect('/');
  } catch (err) {
    console.error('Signup Error:', err);
    req.session.toast = { type: 'error', message: 'Registration failed. Try again.' };
    res.redirect('/signup');
  }
};

exports.postLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).select('+password');
    
    if (!user || !(await bcrypt.compare(password, user.password))) {
      req.session.toast = { type: 'error', message: 'Invalid email or password' };
      return res.redirect('/login');
    }

    // Set session data
    req.session.userId = user._id.toString();
    req.session.role = user.role;
    req.session.name = user.name;
    
    req.session.toast = { type: 'success', message: `Welcome back, ${user.name}!` };
    res.redirect('/');
  } catch (err) {
    console.error('Login Error:', err);
    req.session.toast = { type: 'error', message: 'Login failed. Try again.' };
    res.redirect('/login');
  }
};

exports.logout = (req, res) => {
  req.session.destroy(() => {
    res.redirect('/');
  });
};

// Middleware: Protect routes (requires login)
exports.protect = (req, res, next) => {
  if (!req.session.userId) {
    req.session.toast = { type: 'error', message: 'Please log in to continue' };
    return res.redirect('/login');
  }
  next();
};

// Middleware: Restrict to admin only
exports.adminOnly = (req, res, next) => {
  if (req.session.role !== 'admin') {
    req.session.toast = { type: 'error', message: 'Admin access required' };
    return res.redirect('/');
  }
  next();
};