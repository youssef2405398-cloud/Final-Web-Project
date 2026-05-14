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
    required: true
  },
  maxAttendees: { type: Number, default: 150, min: 1 },
  currentAttendees: { type: Number, default: 0 },
  imageUrl: { type: String },
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending'
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  approvedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  createdAt: { type: Date, default: Date.now }
});

// Virtual for available seats
eventSchema.virtual('availableSeats').get(function () {
  return this.maxAttendees - this.currentAttendees;
});

module.exports = mongoose.model('Event', eventSchema);