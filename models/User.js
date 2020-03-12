const Sequelize = require('sequelize')
const db = require('../database/db.js')

// module.exports
module.exports = db.sequelize.define(
  'user_inform',
  {
    ID: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    EMP_ID: {
        type: Sequelize.INTEGER,
        references: {
            model: 'employees',
            key: 'FIRST_NAME'
        },
        allowNull: false
    },
    LOGIN: {
        type: Sequelize.STRING,
        allowNull: false
    },
    
    PASSWORD: {
        type: Sequelize.STRING,
        allowNull: false
    },
  },
  {
      freezeTableName: true,
      timestamps: false
  }
)
