const RequestError = require('./BaseError');

class ForbiddenError extends RequestError {
  constructor(message) {
    super(message, 403);
    this.name = 'ForbiddenError';
  }
}

module.exports = ForbiddenError;
