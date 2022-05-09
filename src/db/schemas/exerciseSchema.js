const mongoose = require('mongoose');

const exerciseSchema = mongoose.Schema({
  description: {
    type: String,
    required: true
  },
  duration: {
    type: Number,
    required: true
  },
  date: String,
  id: {
    type: String,
    required: true
  }
});

module.exports = exerciseSchema;
