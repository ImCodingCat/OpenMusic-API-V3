const RequestError = require('./BaseError');

class ValidationError extends RequestError {
  constructor(message) {
    super(message, 400);
    this.name = 'ValidationError';
  }
}
module.exports = ValidationError;
