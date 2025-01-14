const Joi = require('joi');
const { ValidationError } = require('../exceptions');
// Made by mdavap

const Schema = Joi.object({
  title: Joi.string().required(),
  year: Joi.number().required(),
  genre: Joi.string().required(),
  performer: Joi.string().required(),
  duration: Joi.number(),
  albumId: Joi.string(),
});

const Validator = {
  validate: (payload) => {
    const validationResult = Schema.validate(payload);
    if (validationResult.error) {
      throw new ValidationError(validationResult.error.message);
    }
  },
};

module.exports = Validator;
