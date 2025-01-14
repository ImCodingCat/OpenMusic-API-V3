class RequestError extends Error {
  constructor(message, statusCode = 500) {
    super(message);
    this.statusCode = statusCode;
    this.name = 'RequestError';
  }
}

module.exports = RequestError;
