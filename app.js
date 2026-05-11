require('dotenv').config();
const express = require('express');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const path = require('path');

// Middleware imports
const requestLogger = require('./middleware/logger');
const { notFound, globalErrorHandler } = require('./middleware/errorHandler');

// Database connection (modular)
const connectDB = require('./config/database');
connectDB();

// Route imports
const authRoutes = require('./routes/authRoutes');
const eventRoutes = require('./routes/eventRoutes');
const adminRoutes = require('./routes/adminRoutes');
const rsvpRoutes = require('./routes/rsvpRoutes');
const staticPagesRoutes = require('./routes/staticPagesRoutes');

const app = express();

// ================= ⚙️ CORE MIDDLEWARE =================
app.set('trust proxy', 1); // Trust first proxy (required for Heroku/Render)

// Parse JSON & URL-encoded bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from /public
app.use(express.static(path.join(__dirname, 'public')));

// HTTP Request Logger (morgan)
app.use(requestLogger);

// ================= 🔐 SESSION MANAGEMENT =================
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({
    mongoUrl: process.env.MONGODB_URI,
    collectionName: 'sessions',
    ttl: 14 * 24 * 60 * 60, // 14 days
    autoRemove: 'native'
  }),
  cookie: {
    secure: process.env.NODE_ENV === 'production', // HTTPS only in production
    httpOnly: true, // Prevent XSS
    maxAge: 14 * 24 * 60 * 60 * 1000, // 14 days in milliseconds
    sameSite: 'lax' // CSRF protection
  }
}));

// ================= 🎨 VIEW ENGINE & GLOBAL VARIABLES =================
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Make session & flash messages available to ALL EJS templates
app.use((req, res, next) => {
  res.locals.user = req.session; // EJS checks: user.userId, user.role, etc.
  res.locals.toast = req.session.toast || null;
  res.locals.csrfToken = req.csrfToken ? req.csrfToken() : '';
  
  // Clear toast after one render (flash message pattern)
  if (req.session.toast) delete req.session.toast;
  
  next();
});

// ================= 🛣️ ROUTES =================
// Order matters: less specific first, most specific last
app.use('/', staticPagesRoutes); // /about, /blog, /support
app.use('/', authRoutes);        // /login, /signup, /logout
app.use('/', eventRoutes);       // /, /events, /events/:id, /create-event
app.use('/', adminRoutes);       // /admin, /admin/events/:id/approve
app.use('/', rsvpRoutes);        // /rsvp/:id, /cancel-rsvp/:id

// ================= 🚨 ERROR HANDLING =================
// 404 Not Found Handler (MUST come after all routes)
app.use(notFound);

// Global Error Handler (MUST be last middleware)
app.use(globalErrorHandler);

// ================= 🚀 START SERVER =================
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📦 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`🔐 Session: ${process.env.NODE_ENV === 'production' ? 'Secure (HTTPS)' : 'Development (HTTP)'}`);
});