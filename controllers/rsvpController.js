const Event = require('../models/Event');
const RSVP = require('../models/RSVP');

exports.getRSVPForm = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id).lean();
    if (!event || event.status !== 'approved') {
      req.session.toast = { type: 'error', message: 'Event not available for RSVP' };
      return res.redirect('/events');
    }

    const alreadyRSVPd = await RSVP.findOne({ user: req.session.userId, event: req.params.id });
    if (alreadyRSVPd) {
      req.session.toast = { type: 'info', message: 'You have already RSVPed to this event' };
      return res.redirect('/events/' + req.params.id);
    }

    event.availableSeats = Math.max(0, event.maxAttendees - event.currentAttendees);
    res.render('rsvp', { title: `RSVP to ${event.title}`, event, page: 'rsvp', pageCss: 'rsvp' });
  } catch (err) {
    console.error('RSVP Form Error:', err);
    req.session.toast = { type: 'error', message: 'Failed to load RSVP page' };
    res.redirect('/events');
  }
};

exports.postRSVP = async (req, res) => {
  try {
    const guestCount = parseInt(req.body.guestCount) || 1;
    const eventId = req.params.id;
    const userId = req.session.userId;

    const event = await Event.findById(eventId);
    if (!event || event.status !== 'approved') {
      req.session.toast = { type: 'error', message: 'Event not found' };
      return res.redirect('/events');
    }

    if (event.currentAttendees + guestCount > event.maxAttendees) {
      req.session.toast = { type: 'error', message: 'Event is at full capacity' };
      return res.redirect('/events/' + eventId);
    }

    const existing = await RSVP.findOne({ user: userId, event: eventId });
    if (existing) {
      req.session.toast = { type: 'info', message: 'Already registered for this event' };
      return res.redirect('/events/' + eventId);
    }

    await RSVP.create({ user: userId, event: eventId, guestCount });
    event.currentAttendees += guestCount;
    await event.save();

    req.session.toast = { type: 'success', message: 'RSVP confirmed! See you there 🎉' };
    res.redirect('/');
  } catch (err) {
    console.error('RSVP Error:', err);
    if (err.code === 11000) {
      req.session.toast = { type: 'info', message: 'You are already registered' };
    } else {
      req.session.toast = { type: 'error', message: 'RSVP failed' };
    }
    res.redirect('/events/' + req.params.id);
  }
};

exports.cancelRSVP = async (req, res) => {
  try {
    const rsvp = await RSVP.findOneAndDelete({ user: req.session.userId, event: req.params.id });
    if (rsvp) {
      await Event.findByIdAndUpdate(req.params.id, { $inc: { currentAttendees: -rsvp.guestCount } });
      req.session.toast = { type: 'success', message: 'RSVP cancelled' };
    }
    res.redirect('/events');
  } catch (err) {
    console.error('Cancel RSVP Error:', err);
    req.session.toast = { type: 'error', message: 'Failed to cancel RSVP' };
    res.redirect('/events/' + req.params.id);
  }
};