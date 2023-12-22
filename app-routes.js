/**
 * Configure all routes for express app
 */

const _ = require('lodash')
const config = require('config')
const HttpStatus = require('http-status-codes').StatusCodes
const helper = require('./src/common/helper')
const routes = require('./src/routes')
const logger = require('./src/common/logger')

/**
 * Configure all routes for express app
 * @param app the express app
 */
module.exports = (app) => {
  // Load all routes
  _.each(routes, (verbs, path) => {
    _.each(verbs, (def, verb) => {
      const controllerPath = `./src/controllers/${def.controller}`
      const method = require(controllerPath)[def.method]
      if (!method) {
        throw new Error(`${def.method} is undefined`)
      }

      const actions = []
      actions.push((req, res, next) => {
        req.signature = `${def.controller}#${def.method}`
        logger.info({
          component: 'App',
          message: `* ${req.ip} * ${verb.toUpperCase()} ${req.originalUrl}`
        })
        next()
      })

      actions.push(method)
      const fullPath = config.get('PATH_PREFIX') + path
      app[verb](fullPath, helper.autoWrapExpress(actions))
    })
  })

  // Check if the route is not found or HTTP method is not supported
  app.use('*', (req, res) => {
    let url = req.baseUrl
    if (url.indexOf(config.get('PATH_PREFIX')) === 0) {
      url = url.substring(config.get('PATH_PREFIX').length)
    }
    const route = routes[url]
    if (route) {
      res
        .status(HttpStatus.METHOD_NOT_ALLOWED)
        .json({ message: 'The requested HTTP method is not supported.' })
    } else {
      res
        .status(HttpStatus.NOT_FOUND)
        .json({ message: 'The requested resource cannot be found.' })
    }
  })
}
