const { Sequelize, Model } = require('sequelize')
const config = require('config')

/**
 * @param {Sequelize} sequelize the initialized sequelize
 */
module.exports = (sequelize) => {
  class Weather extends Model {}
  Weather.init(
    {
      id: {
        type: Sequelize.UUID,
        primaryKey: true,
        allowNull: false,
        defaultValue: Sequelize.UUIDV4
      },
      city: {
        field: 'city',
        type: Sequelize.STRING(50),
        allowNull: false
      },
      date: {
        field: 'date',
        type: Sequelize.DATEONLY,
        allowNull: false
      },
      tempC: {
        field: 'temp_c',
        type: Sequelize.DECIMAL,
        allowNull: false
      },
      tempF: {
        field: 'temp_f',
        type: Sequelize.DECIMAL,
        allowNull: false
      }
    },
    {
      schema: config.DB_SCHEMA_NAME,
      sequelize,
      tableName: 'weather',
      paranoid: false,
      timestamps: false,
      indexes: [
        {
          unique: true,
          fields: ['city', 'date']
        }
      ]
    }
  )
  return Weather
}
