const Joi = require('joi');
const { ValidationError } = require('../exceptions');
// Made by mdavap

const Schema = Joi.object({
  targetEmail: Joi.string().email().required(),
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
