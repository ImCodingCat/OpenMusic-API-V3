const Joi = require('joi');
const { ValidationError } = require('../exceptions');
// Made by mdavap

const Schema = Joi.object({
  name: Joi.string().required(),
  year: Joi.number().required(),
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
