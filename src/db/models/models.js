const mongoose = require('mongoose');

const userSchema = require('../schemas/userSchema');
const exerciseSchema = require('../schemas/exerciseSchema');

const User = mongoose.model('User', userSchema);

const Exercise = mongoose.model('Exercise', exerciseSchema);

module.exports = {
  User,
  Exercise
};
