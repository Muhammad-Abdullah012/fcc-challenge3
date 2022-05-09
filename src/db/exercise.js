const fs = require('fs');
const models = require('./models/models');
const User = require('./users');

process.on('unhandledRejection', (reason, promise) => {
  const writeStream = fs.createWriteStream('errors_log.txt', { open: 'w' });
  writeStream.write(`Error due to ${reason.toString()}`);
  writeStream.write(' - ');
  writeStream.write(`at promise ${promise.toString()}`);
  writeStream.close();
});

const createExercise = async (description, duration, date = new Date().toDateString(), id) => {
  const exerciseObj = {
    description,
    duration,
    date,
    id
  };
  const exercise = await models.Exercise.create(exerciseObj);
  const user = await User.getUserById(exerciseObj.id);
  return {
    description: exercise.description,
    duration: exercise.duration,
    date: exercise.date,
    _id: user._id,
    username: user.username
  };
};

const getExerciseLogs = async (id, from, to, limit) => {
  const user = await User.getUserById(id);
  if (!user) return `No user for id ${id}`;
  const exercises = await models.Exercise.find({
    id,
    date: { $gt: from, $lt: to }
  }).limit(limit);
  return {
    username: user.username,
    _id: user._id,
    count: exercises.length,
    log: exercises
  };
};

module.exports = {
  createExercise,
  getExerciseLogs
};
