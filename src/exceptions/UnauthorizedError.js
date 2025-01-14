const RequestError = require('./BaseError');

class UnauthorizedError extends RequestError {
  constructor(message) {
    super(message, 401);
    this.name = 'UnauthorizedError';
  }
}

module.exports = UnauthorizedError;
