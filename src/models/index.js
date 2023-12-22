const config = require('config')
const Sequelize = require('sequelize')

const Weather = require('./Weather')

const sequelize = new Sequelize(config.get('DATABASE_URL'), {
  logging: config.LOG_LEVEL === 'debug' ? console.log : false
})
const WeatherModel = Weather(sequelize)

const models = {
  Weather: WeatherModel,
  sequelize,
  Sequelize
}

module.exports = models
