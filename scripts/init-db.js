/**
 * Sync the database models to db tables.
 */
const config = require('config')
const models = require('../src/models')
const logger = require('../src/common/logger')

const initDB = async () => {
  if (process.argv[2] === 'force') {
    await models.sequelize.dropSchema(config.DB_SCHEMA_NAME)
  }
  const schemas = await models.sequelize.showAllSchemas()
  if (!schemas.includes(config.DB_SCHEMA_NAME)) {
    await models.sequelize.createSchema(config.DB_SCHEMA_NAME)
  }

  // re-init all tables
  await models.sequelize.sync()
}

if (!module.parent) {
  initDB().then(() => {
    logger.info({ component: 'init-db', message: 'Database synced successfully' })
    return process.exit()
  }).catch((e) => {
    logger.logFullError(e, { component: 'init-db' })
    process.exit(1)
  })
}

module.exports = {
  initDB
}
