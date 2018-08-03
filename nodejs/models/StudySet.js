const mongoose = require('mongoose');

var StudySet = mongoose.model('StudySet', {
  name: { type: String },
  notecards: { type: Array }
});

module.exports = { StudySet };
