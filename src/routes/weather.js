module.exports = {
  '/weather': {
    get: {
      controller: 'WeatherController',
      method: 'getForecast'
    }
  }
}
