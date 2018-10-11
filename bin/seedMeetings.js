const fs = require('fs');
const csv = require('fast-csv');
const mongoose = require('mongoose');

const keys = require('../config/keys');

mongoose.connect(keys.mongoDbURI);
require('../models');
const Meeting = mongoose.model('meetings');

const stream = fs.createReadStream('./bin/import/denverMeetings.csv');

const csvStream = csv({ headers: true })
  .on('data', data => {
    new Meeting(data).save().then(newMeeting => console.log(newMeeting));
  })
  .on('end', () => {
    console.log('done!');
  });

stream.pipe(csvStream);
