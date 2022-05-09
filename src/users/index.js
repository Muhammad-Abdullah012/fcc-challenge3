const express = require('express');

const router = express.Router();

const { createUser, getAllUsers } = require('../db/users');
const { createExercise, getExerciseLogs } = require('../db/exercise');
const {
  idSchema,
  exerciseSchema,
  userSchema,
  logsSchema
} = require('../joi_schemas/joiSchemas');

router.param('/_id', (req, res, next, id) => {
  idSchema.validateAsync(id).then(() => {
    next();
  }).catch((err) => {
    next(err);
  });
});

router.route('/')
  .post((req, res, next) => {
    const { username } = req.body;
    userSchema.validateAsync(username)
      .then(() => { next(); })
      .catch((err) => { next(err); });
  }, async (req, res) => {
    const { username } = req.body;
    const user = await createUser(username);
    res.json(user);
  })
  .get(async (req, res) => {
    const users = await getAllUsers();
    res.json(users);
  });

router.route('/:_id/exercises')
  .post((req, res, next) => {
    const { description, duration, date } = req.body;
    const { _id } = req.params;
    const exerciseObj = {
      description,
      duration,
      date,
      _id
    };
    exerciseSchema.validateAsync(exerciseObj).then((exObj) => {
      Object.assign(req.body, exObj);
      next();
    }).catch((err) => { next(err); });
  }, async (req, res) => {
    const { description, duration, date } = req.body;
    const { _id } = req.params;
    const exercise = await createExercise(description, duration, date, _id);
    res.json(exercise);
  });

router.get('/:_id/logs', (req, res, next) => {
  const { from, to, limit } = req.query;
  const obj = {
    from,
    to,
    limit
  };
  logsSchema.validateAsync(obj)
    .then(() => { next(); })
    .catch((err) => { next(err); });
}, async (req, res) => {
  const { from, to, limit } = req.query;
  const exerciseLogs = await getExerciseLogs(req.params._id, from, to, limit);
  res.json(exerciseLogs);
});

module.exports = router;
