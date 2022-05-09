const Joi = require('joi');

const idSchema = Joi.string().required();

const userSchema = Joi.string().required();

const exerciseSchema = Joi.object().keys({
  description: Joi.string().required(),
  duration: Joi.string().required(),
  date: Joi.alternatives([
    Joi.date(),
    Joi.string().valid('')
  ]),
  _id: Joi.string().required()
});

const logsSchema = Joi.object().keys({
  from: Joi.date(),
  to: Joi.date(),
  limit: Joi.number()
});

module.exports = {
  idSchema,
  exerciseSchema,
  userSchema,
  logsSchema
};
