/**
 * This service provides operations of Black List.
 */
const joi = require('joi')
const JoiDate = require('@joi/date')
/** @type {import('joi')} */
const Joi = joi.extend(JoiDate)
const dayjs = require('dayjs')
const isBetween = require('dayjs/plugin/isBetween')
dayjs.extend(isBetween)
const { Op } = require('sequelize')
const { Weather } = require('../models')

/**
 * Get Forecast
 * @param {Object} criteria the search criteria
 * @returns {Object} the result
 */
async function getForecast (criteria) {
  const condition = {
    where: {
      city: criteria.city,
      date: { [Op.between]: [criteria.startDate, criteria.endDate] }
    },
    order: ['date']
  }
  const forecast = await Weather.findAll(condition)

  return forecast
}

getForecast.schema = Joi.object()
  .keys({
    criteria: Joi.object()
      .keys({
        temperature: Joi.string().valid('C', 'F').insensitive().default('C'),
        city: Joi.city().required(),
        startDate: Joi.date()
          .format('YYYY-MM-DD')
          .custom((value, helper) => {
            const start = dayjs().subtract(8, 'day').format('YYYY-MM-DD')
            const end = dayjs().add(8, 'day').format('YYYY-MM-DD')
            if (dayjs(value).isBetween(start, end)) {
              return value
            }
            return helper.message(
              `"criteria.startDate" must be between ${start} and ${end}`
            )
          })
          .required()
          .raw(),
        endDate: Joi.date()
          .min(Joi.ref('startDate'))
          .custom((value, helper) => {
            const start = dayjs().subtract(8, 'day').format('YYYY-MM-DD')
            const end = dayjs().add(8, 'day').format('YYYY-MM-DD')
            if (dayjs(value).isBetween(start, end)) {
              return value
            }
            return helper.message(
              `"criteria.startDate" must be between ${start} and ${end}`
            )
          })
          .format('YYYY-MM-DD')
          .required()
          .raw()
      })
      .required()
  })
  .required()

module.exports = {
  getForecast
}
