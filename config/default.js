require('dotenv').config()
module.exports = {
  // the log switch, assign a value to disable logging
  DISABLE_LOGGING: process.env.DISABLE_LOGGING,
  // the log level, default is 'debug'
  LOG_LEVEL: process.env.LOG_LEVEL || 'debug',
  // the server port, default is 3000
  PORT: process.env.PORT || 3000,
  // the server api base path
  PATH_PREFIX: process.env.PATH_PREFIX || '/api/v1',

  ALLOWED_ORIGIN: process.env.ALLOWED_ORIGIN || '*',

  AUTH_SECRET: process.env.AUTH_SECRET || 'mysecret',
  DATABASE_URL: process.env.DATABASE_URL || 'postgres://postgres:postgres@localhost:5432/postgres',
  DB_SCHEMA_NAME: process.env.DB_SCHEMA_NAME || 'weather',

  WEATHER_API_URL: process.env.WEATHER_API_URL || 'https://api.weatherapi.com/v1',
  WEATHER_API_KEY: process.env.WEATHER_API_KEY
}
