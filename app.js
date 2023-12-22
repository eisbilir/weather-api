require('./src/bootstrap')
const config = require('config')
const express = require('express')
const cors = require('cors')
const _ = require('lodash')
const cron = require('node-cron')
const logger = require('./src/common/logger')
const helper = require('./src/common/helper')
const ExtWeatherService = require('./src/services/ExtWeatherService')

// setup express app
const app = express()

app.use(
  cors({
    origin: _.split(config.get('ALLOWED_ORIGIN'), ',')
  })
)
app.use(express.json({ limit: '5mb' }))
app.use(express.urlencoded({ extended: true, limit: '5mb' }))

// Register routes
require('./app-routes')(app)

app.use(helper.errorHandler)

app.listen(config.PORT, () => {
  logger.info({
    component: 'app',
    message: `Express server listening on port ${config.PORT}`
  })
  ExtWeatherService.updateWeatherDB()
  cron.schedule('0 3 * * *', ExtWeatherService.updateWeatherDB, {})
})
