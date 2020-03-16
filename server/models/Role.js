const Sequelize = require('sequelize')
const db = require('../database/db.js')

// module.exports
module.exports = db.sequelize.define(
  'roles_ref',
  {
    ROLE_ID: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    ROLE_DESC: {
        type: Sequelize.STRING,
        allowNull: false
    }
  },
  {
      freezeTableName: true,
      timestamps: false
  }
)
