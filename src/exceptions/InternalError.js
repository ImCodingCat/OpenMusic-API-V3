const RequestError = require('./BaseError');

class InternalError extends RequestError {
  constructor(message) {
    super(message);
    this.name = 'InternalError';
  }
}

module.exports = InternalError;
