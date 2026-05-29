const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  description: { type: String, required: true },
  organizer: { type: String, required: true },
  location: { type: String, required: true },
  date: { type: Date, required: true },
  time: { type: String, required: true },
  category: {
    type: String,
    enum: ['academic', 'sports', 'cultural', 'social', 'workshop'],
    rectId, ref: 'User'
  },
  createdAt: { type: Date, default: Date.now }
});

// Virtual for available seats
eventSchema.virtual('availableSeats').get(function () {
  return this.maxAttendees - this.currentAttendees;
});

module.exports = mongoose.model('Event', eventSchema);