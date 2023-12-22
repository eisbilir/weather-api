const axios = require('axios').default
const config = require('config')
const dayjs = require('dayjs')
const _ = require('lodash')
const { VALID_CITIES } = require('../../app-constants')
const { Weather } = require('../models')

const updateWeatherDB = async () => {
  for (const city of VALID_CITIES) {
    const { data: nextDays } = await axios.get(
      `${config.WEATHER_API_URL}/forecast.json?q=${city}&days=8&hour=17&key=${config.WEATHER_API_KEY}`
    )
    Weather.bulkCreate(mapForecast(city, nextDays), {
      updateOnDuplicate: ['tempC', 'tempF']
    })

    const { data: previousDays } = await axios.get(
      `${config.WEATHER_API_URL}/history.json?q=${city}&dt=${dayjs()
        .subtract(7, 'day')
        .format('YYYY-MM-DD')}&end_dt=${dayjs()
        .subtract(1, 'day')
        .format('YYYY-MM-DD')}&hour=17&key=${config.WEATHER_API_KEY}`
    )
    Weather.bulkCreate(mapForecast(city, previousDays), {
      updateOnDuplicate: ['tempC', 'tempF']
    })
  }
}

const mapForecast = (city, data) => {
  return _.map(data.forecast.forecastday, (c) => {
    return {
      city,
      date: c.date,
      tempC: c.day.avgtemp_c,
      tempF: c.day.avgtemp_f
    }
  })
}

module.exports = {
  updateWeatherDB
}
