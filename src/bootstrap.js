const fs = require('fs')
const path = require('path')
const logger = require('./common/logger')
const { VALID_CITIES } = require('../app-constants')
const Joi = require('joi')

Joi.city = () => Joi.string().valid(...VALID_CITIES)

function buildServices (dir) {
  const files = fs.readdirSync(dir)

  files.forEach((file) => {
    const curPath = path.join(dir, file)
    fs.stat(curPath, (err, stats) => {
      if (err) return
      if (stats.isDirectory()) {
        buildServices(curPath)
      } else if (path.extname(file) === '.js') {
        const serviceName = path.basename(file, '.js')
        logger.buildService(require(curPath), serviceName)
      }
    })
  })
}

buildServices(path.join(__dirname, 'services'))
