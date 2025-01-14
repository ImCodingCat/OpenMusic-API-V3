const Joi = require('joi');
const { ValidationError } = require('../exceptions');
// Made by mdavap

const RegisterAuthSchema = Joi.object({
  username: Joi.string().required(),
  password: Joi.string().required(),
  fullname: Joi.string().required(),
});

const LoginAuthSchema = Joi.object({
  username: Joi.string().required(),
  password: Joi.string().required(),
});

const RefreshAuthSchema = Joi.object({
  refreshToken: Joi.string().required(),
});

const Validator = {
  validateRegister: (payload) => {
    const validationResult = RegisterAuthSchema.validate(payload);
    if (validationResult.error) {
      throw new ValidationError(validationResult.error.message);
    }
  },
  validateLogin: (payload) => {
    const validationResult = LoginAuthSchema.validate(payload);
    if (validationResult.error) {
      throw new ValidationError(validationResult.error.message);
    }
  },
  validateRefreshToken: (payload) => {
    const validationResult = RefreshAuthSchema.validate(payload);
    if (validationResult.error) {
      throw new ValidationError(validationResult.error.message);
    }
  },
};

module.exports = Validator;
