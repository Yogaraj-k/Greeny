const mongoose = require('mongoose');

const countdownSchema = new mongoose.Schema({
  countdownTime: {
    type: Date,
    required: true
  }
});

const CountdownDate = mongoose.model('CountdownDate', countdownSchema);

module.exports = CountdownDate;