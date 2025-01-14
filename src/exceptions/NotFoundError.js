const RequestError = require('./BaseError');

class NotFoundError extends RequestError {
  constructor(message) {
    super(message, 404);
    this.name = 'NotFoundError';
  }
}

module.exports = NotFoundError;
