const Sequelize = require('sequelize')
const db = require('../database/db.js')

module.exports = db.sequelize.define(
  'user_inform',
  {
    ID: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    EMP_ID: {
        type: Sequelize.INTEGER
    },
    LOGIN: {
        type: Sequelize.STRING
    },
    
    PASSWORD: {
        type: Sequelize.STRING
    },
  },
  {
      freezeTableName: true,
      timestamps: false
  }
)