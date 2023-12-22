/**
 * Controller for weather endpoints
 */
const service = require('../services/ThemeService')

/**
 * Get theme
 * @param req the request
 * @param res the response
 */
async function getTheme (req, res) {
  res.send(await service.getTheme(req.query))
}

module.exports = {
  getTheme
}
