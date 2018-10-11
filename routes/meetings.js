const express = require('express');
const router = express.Router();

const mongoose = require('mongoose');
const Meeting = mongoose.model('meetings');

router.get('/', (req, res) => {
  Meeting.find().then(meetings => {
    res.json(meetings);
  });
});

module.exports = router;
