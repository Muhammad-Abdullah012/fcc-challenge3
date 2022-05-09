const fs = require('fs');
const models = require('./models/models');

process.on('unhandledRejection', (reason, promise) => {
  const writeStream = fs.createWriteStream('errors_log.txt');
  writeStream.write(`Error due to ${reason.toString()}`);
  writeStream.write(' - ');
  writeStream.write(`at promise ${promise.toString()}`);
  writeStream.close();
});

const createUser = async (username) => {
  const user = await models.User.find({ username });
  if (user) return user;
  return models.User.create({ username });
};

const getUserById = async (id) => models.User.findById(id);

const getAllUsers = async () => models.User.find();

module.exports = {
  createUser,
  getAllUsers,
  getUserById
};
