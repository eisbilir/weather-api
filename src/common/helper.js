const _ = require('lodash')
const logger = require('./logger')
const HttpStatus = require('http-status-codes').StatusCodes

/**
 * Wrap async function to standard express function
 * @param {Function} fn the async function
 * @returns {Function} the wrapped function
 */
function wrapExpress (fn) {
  return function (req, res, next) {
    // eslint-disable-next-line promise/no-callback-in-promise
    fn(req, res, next).catch(next)
  }
}

/**
 * Wrap all functions from object
 * @param obj the object (controller exports)
 * @returns {Object|Array} the wrapped object
 */
function autoWrapExpress (obj) {
  if (_.isArray(obj)) {
    return obj.map(autoWrapExpress)
  }
  if (_.isFunction(obj)) {
    if (obj.constructor.name === 'AsyncFunction') {
      return wrapExpress(obj)
    }
    return obj
  }
  _.each(obj, (value, key) => {
    obj[key] = autoWrapExpress(value)
  })
  return obj
}

/**
 * The error handler
 * @param err the error
 * @param req the request
 * @param res the response
 * @param next the next
 */
function errorHandler (err, req, res, next) {
  logger.logFullError(err, {
    component: 'app',
    signature: req.signature || `${req.method}_${req.url}`
  })
  const errorResponse = {}
  const status = err.isJoi
    ? HttpStatus.BAD_REQUEST
    : err.status || err.httpStatus || HttpStatus.INTERNAL_SERVER_ERROR

  if (_.isArray(err.details)) {
    if (err.isJoi) {
      _.map(err.details, (e) => {
        if (e.message) {
          if (_.isUndefined(errorResponse.message)) {
            errorResponse.message = e.message
          } else {
            errorResponse.message += `, ${e.message}`
          }
        }
      })
    }
  }

  if (_.isUndefined(errorResponse.message)) {
    if (
      err.message &&
      (err.httpStatus || status !== HttpStatus.INTERNAL_SERVER_ERROR)
    ) {
      errorResponse.message = err.message
    } else {
      errorResponse.message = 'Internal server error'
    }
  }

  res.status(status).json(errorResponse)
}

module.exports = {
  autoWrapExpress,
  errorHandler
}
