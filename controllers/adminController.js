const Event = require('../models/Event');
const User = require('../models/User');

exports.getDashboard = async (req, res) => {
  try {
    const [pendingEvents, recentApproved, totalUsers, totalEvents] = await Promise.all([
      Event.find({ status: 'pending' }).populate('createdBy', 'name email').sort({ createdAt: -1 }).lean(),
      Event.find({ status: 'approved' }).sort({ createdAt: -1 }).limit(5).lean(),
      User.countDocuments(),
      Event.countDocuments()
    ]);

    res.render('admin', {
      title: 'Admin Dashboard',
      page: 'admin',
      pageCss: 'admin',
      pendingEvents,
      recentApproved,
      stats: { totalUsers, totalEvents, pendingCount: pendingEvents.length }
    });
  } catch (err) {
    console.error('Dashboard Error:', err);
    req.session.toast = { type: 'error', message: 'Failed to load dashboard' };
    res.redirect('/');
  }
};

exports.approveEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event || event.status !== 'pending') {
      req.session.toast = { type: 'error', message: 'Event not found or already processed' };
      return res.redirect('/admin');
    }

    event.status = 'approved';
    event.approvedBy = req.session.userId;
    await event.save();

    req.session.toast = { type: 'success', message: `"${event.title}" has been approved` };
    res.redirect('/admin');
  } catch (err) {
    console.error('Approve Error:', err);
    req.session.toast = { type: 'error', message: 'Approval failed' };
    res.redirect('/admin');
  }
};

exports.rejectEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event || event.status !== 'pending') {
      req.session.toast = { type: 'error', message: 'Event not found or already processed' };
      return res.redirect('/admin');
    }

    event.status = 'rejected';
    await event.save();

    req.session.toast = { type: 'info', message: `"${event.title}" has been rejected` };
    res.redirect('/admin');
  } catch (err) {
    console.error('Reject Error:', err);
    req.session.toast = { type: 'error', message: 'Rejection failed' };
    res.redirect('/admin');
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}).sort({ createdAt: -1 }).select('-password').lean();
    res.render('admin-users', { title: 'Manage Users', page: 'admin', users });
  } catch (err) {
    console.error('Users Error:', err);
    req.session.toast = { type: 'error', message: 'Failed to load users' };
    res.redirect('/admin');
  }
};