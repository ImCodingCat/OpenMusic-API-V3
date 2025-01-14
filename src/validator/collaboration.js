const Joi = require('joi');
const { ValidationError } = require('../exceptions');
// Made by mdavap

const Schema = Joi.object({
  playlistId: Joi.string().required(),
  userId: Joi.string().required(),
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
