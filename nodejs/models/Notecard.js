const mongoose = require('mongoose');

var Notecard = mongoose.model('Notecard', {
  term: { type: String },
  definition: { type: String }
});

module.exports = { Notecard };
