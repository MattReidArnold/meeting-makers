const fs = require('fs');
const csv = require('fast-csv');
const mongoose = require('mongoose');

const keys = require('../config/keys');

mongoose.connect(keys.mongoDbURI);
require('../models');
const Meeting = mongoose.model('meetings');

const stream = fs.createReadStream('./bin/import/denverMeetings.csv');

const convertToMinutesOffset = time => {
  const sections = time.split(' ');
  const timeParts = sections
    .find(() => true)
    .split(':')
    .map(p => parseInt(p));

  if (sections.length < 2 || timeParts < 2 || timeParts.some(p => p === NaN)) {
    throw `Time is invalid: ${time}`;
  }

  const AmPm = sections[1];
  let hourOffset = 0;
  if (AmPm.toUpperCase() === 'PM') {
    hourOffset = 12;
  }
  const [hours, minutes] = timeParts;
  return (hours + hourOffset) * 60 + minutes;
};

const convertToDayOffset = day => {
  switch (day.toUpperCase()) {
    case 'SUNDAY':
      return 0;
    case 'MONDAY':
      return 1;
    case 'TUESDAY':
      return 2;
    case 'WEDNESDAY':
      return 3;
    case 'THURSDAY':
      return 4;
    case 'FRIDAY':
      return 5;
    case 'SATURDAY':
      return 6;
    default:
      return -1;
  }
};

const csvStream = csv({ headers: true })
  .on('data', data => {
    const { time, day } = data;
    data.timeMinutesOffset = convertToMinutesOffset(time);
    data.dayOffset = convertToDayOffset(day);
    new Meeting(data).save().then(newMeeting => console.log(newMeeting));
  })
  .on('end', () => {
    console.log('done!');
  });

Meeting.deleteMany({}, err => {
  if (err) {
    console.error(err);
  } else {
    console.log('Deleted all meeting documents');
    stream.pipe(csvStream);
  }
});
