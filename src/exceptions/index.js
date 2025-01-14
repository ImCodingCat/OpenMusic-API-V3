const InternalError = require('./InternalError');
const NotFoundError = require('./NotFoundError');
const ValidationError = require('./ValidationError');
const UnauthorizedError = require('./UnauthorizedError');
const ForbiddenError = require('./ForbiddenError');
const RequestError = require('./BaseError');

module.exports = {
  InternalError, NotFoundError, ValidationError, UnauthorizedError, ForbiddenError, RequestError,
};
