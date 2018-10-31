const mongoose = require('mongoose');
const { Schema } = mongoose;

const meetingSchema = new Schema({
  day: String,
  dayOffset: Number,
  time: String,
  timeMinutesOffset: Number,
  groupName: String,
  address: String,
  city: String,
  district: String,
  codes: String
});

mongoose.model('meetings', meetingSchema);
