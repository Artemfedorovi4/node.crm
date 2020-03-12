const Sequelize = require('sequelize')
const db = require('../database/db.js')

module.exports = db.sequelize.define(
    'employees',
    {
        USER_ID: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true
        },
        ROLE_ID: {
            type: Sequelize.INTEGER,
            references: {
                
            }
        },
        LAST_NAME: {
            type: Sequelize.STRING
        },
        FIRST_NAME: {
            type: Sequelize.STRING
        },
        EMAIL: {
            type: Sequelize.STRING
        },
        TEL_NUM: {
            type: Sequelize.STRING
        }
    },
    {
        freezeTableName: true,
        timestamps: false
    }
  )