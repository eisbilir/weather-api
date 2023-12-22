/**
 * This file defines application errors
 */
const { StatusCodes } = require('http-status-codes')

/**
 * Helper function to create generic error object with http status code
 * @param {String} name the error name
 * @param {Number} statusCode the http status code
 * @returns {Function} the error constructor
 * @private
 */
function createError (name, statusCode) {
  /**
   * The error constructor
   * @param {String} message the error message
   * @param {String} [cause] the error cause
   * @constructor
   */
  class ErrorCtor extends Error {
    constructor (message, cause) {
      super()
      Error.call(this)
      Error.captureStackTrace(this)
      this.message = message || name
      this.cause = cause
      this.httpStatus = statusCode
    }
  }

  ErrorCtor.prototype.name = name
  return ErrorCtor
}

module.exports = {
  BadRequestError: createError('BadRequestError', StatusCodes.BAD_REQUEST),
  UnauthorizedError: createError('UnauthorizedError', StatusCodes.UNAUTHORIZED),
  ForbiddenError: createError('ForbiddenError', StatusCodes.FORBIDDEN),
  NotFoundError: createError('NotFoundError', StatusCodes.NOT_FOUND),
  ConflictError: createError('ConflictError', StatusCodes.CONFLICT),
  InternalServerError: createError(
    'InternalServerError',
    StatusCodes.INTERNAL_SERVER_ERROR
  )
}
