/**
 * This service provides operations of Black List.
 */
const Joi = require('joi')
const themes = require('../theme')
const { VALID_THEME_LANG } = require('../../app-constants')

/**
 * Get Forecast
 * @param {Object} criteria the search criteria
 * @returns {Object} the result
 */
async function getTheme (criteria) {
  console.log(themes)
  const lang = criteria.lang
  return themes[lang]
}

getTheme.schema = Joi.object()
  .keys({
    criteria: Joi.object()
      .keys({
        lang: Joi.string()
          .valid(...VALID_THEME_LANG)
          .insensitive()
          .default('en')
      })
      .required()
  })
  .required()

module.exports = {
  getTheme
}
