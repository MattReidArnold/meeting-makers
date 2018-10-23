const mongoose = require('mongoose');
const Meeting = mongoose.model('meetings');

module.exports = {
  findAll: (req, res) => {
    const { skip, limit } = req.paging;
    Meeting.find(null, null, { skip, limit }).then(meetings => {
      res.json(meetings);
    });
  }
};
