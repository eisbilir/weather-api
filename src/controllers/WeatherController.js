/**
 * Controller for weather endpoints
 */
const service = require('../services/WeatherService')

/**
 * Get forecast
 * @param req the request
 * @param res the response
 */
async function getForecast (req, res) {
  res.send(await service.getForecast(req.query))
}

module.exports = {
  getForecast
}
