const Event = require('../models/Event');
const RSVP = require('../models/RSVP');

exports.getHome = async (req, res) => {
  try {
    const featuredEvents = await Event.find({ status: 'approved' })
      .sort({ date: 1 })
      .limit(6)
      .lean();
    res.render('index', { title: 'Home', featuredEvents, page: 'home', pageCss: 'homepage' });
  } catch (err) {
    console.error('Home Error:', err);
    req.session.toast = { type: 'error', message: 'Failed to load events' };
    res.render('index', { title: 'Home', featuredEvents: [], page: 'home' });
  }
};

exports.getEvents = async (req, res) => {
  try {
    const { category, search, page = 1 } = req.query;
    const limit = 12;
    const skip = (parseInt(page) - 1) * limit;
    
    let query = { status: 'approved' };
    if (category) query.category = category;
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { location: { $regex: search, $options: 'i' } }
      ];
    }

    const [events, total] = await Promise.all([
      Event.find(query).sort({ date: 1 }).skip(skip).limit(limit).lean(),
      Event.countDocuments(query)
    ]);

    res.render('events', {
      title: 'All Events',
      events,
      page: 'events',
      pageCss: 'events',
      filters: req.query,
      pagination: {
        currentPage: parseInt(page),
        totalPages: Math.ceil(total / limit),
        hasPrev: page > 1,
        hasNext: parseInt(page) * limit < total
      }
    });
  } catch (err) {
    console.error('Events Error:', err);
    req.session.toast = { type: 'error', message: 'Failed to fetch events' };
    res.render('events', { title: 'Events', events: [], filters: {}, pagination: { currentPage: 1 } });
  }
};

exports.getCreateEvent = (req, res) => {
  res.render('create-event', { title: 'Create Event', page: 'create', pageCss: 'create-event' });
};

exports.postCreateEvent = async (req, res) => {
  try {
    const { title, organizer, date, time, location, category, maxAttendees, description } = req.body;
    
    if (!title || !organizer || !date || !time || !location || !category || !description) {
      req.session.toast = { type: 'error', message: 'All fields are required' };
      return res.redirect('/create-event');
    }

    const eventDate = new Date(date);
    if (eventDate < new Date().setHours(0,0,0,0)) {
      req.session.toast = { type: 'error', message: 'Event date cannot be in the past' };
      return res.redirect('/create-event');
    }

    // Determine the image URL
    let finalImageUrl = '/images/default-event.jpg';
    if (req.file) {
      // file path will be something like public\uploads\events\filename.jpg
      // we need the browser path /uploads/events/filename.jpg
      finalImageUrl = '/uploads/events/' + req.file.filename;
    }

    await Event.create({
      title, organizer, date: eventDate, time, location, category,
      maxAttendees: parseInt(maxAttendees) || 150,
      imageUrl: finalImageUrl,
      description,
      createdBy: req.session.userId,
      status: 'pending'
    });

    req.session.toast = { type: 'success', message: 'Event submitted for admin approval!' };
    res.redirect('/events');
  } catch (err) {
    console.error('Create Event Error:', err);
    req.session.toast = { type: 'error', message: 'Failed to create event' };
    res.redirect('/create-event');
  }
};

exports.getEventDetail = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id).populate('createdBy', 'name').lean();
    if (!event || event.status !== 'approved') {
      req.session.toast = { type: 'error', message: 'Event not found or not approved' };
      return res.redirect('/events');
    }
    
    event.availableSeats = Math.max(0, event.maxAttendees - event.currentAttendees);
    
    let hasRSVPed = false;
    if (req.session.userId) {
      const existingRSVP = await RSVP.findOne({ user: req.session.userId, event: event._id });
      hasRSVPed = !!existingRSVP;
    }

    res.render('event-detail', { 
      title: event.title, 
      event, 
      page: 'event-detail', 
      pageCss: 'event-detail',
      hasRSVPed 
    });
  } catch (err) {
    console.error('Event Detail Error:', err);
    req.session.toast = { type: 'error', message: 'Failed to load event' };
    res.redirect('/events');
  }
};