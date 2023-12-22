const fs = require('fs')
const path = require('path')

const themes = {}

fs.readdirSync(__dirname)
  .filter(
    (file) =>
      file.indexOf('.') !== 0 &&
      file !== path.basename(module.filename) &&
      file.slice(-5) === '.json'
  )
  .forEach((file) => {
    const moduleName = file.slice(0, -5)
    themes[moduleName] = require(path.join(__dirname, file))
  })

module.exports = themes
