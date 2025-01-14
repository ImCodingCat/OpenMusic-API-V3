const Joi = require('joi');
const { ValidationError } = require('../exceptions');
// Made by mdavap

const HeaderSchema = Joi.object({
  'content-type': Joi.string().valid('image/apng', 'image/avif', 'image/gif', 'image/jpeg', 'image/png', 'image/webp').required(),
}).unknown();

const Validator = {
  validateHeader: (headers) => {
    const validationResult = HeaderSchema.validate(headers);
    if (validationResult.error) {
      throw new ValidationError(validationResult.error.message);
    }
  },
};

module.exports = Validator;
