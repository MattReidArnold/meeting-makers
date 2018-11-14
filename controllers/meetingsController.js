const mongoose = require('mongoose');
const Meeting = mongoose.model('meetings');

module.exports = {
  findAll: (req, res) => {
    const { skip, limit } = req.paging;
    const sort = { dayOffset: 1, timeMinutesOffset: 1 };
    Meeting.find(null, null, { skip, limit, sort }).then(meetings => {
      res.pagedJson(meetings);
    });
  }
};
