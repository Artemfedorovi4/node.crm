const Sequelize = require('sequelize')
const db = require('../database/db.js')

module.exports = db.sequelize.define(
    'employees',
    {
        USER_ID: {
            allowNull: false,
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        ROLE_ID: {
            type: Sequelize.INTEGER,
            references: {
                model: 'roles_ref',
                key: 'ROLE_ID'
            }
        },
        LAST_NAME: {
            allowNull: false,
            type: Sequelize.STRING
        },
        FIRST_NAME: {
            allowNull: false,
            type: Sequelize.STRING
        },
        EMAIL: {
            allowNull: false,
            type: Sequelize.STRING
        },
        TEL_NUM: {
            allowNull: false,
            type: Sequelize.STRING
        }
    },
    {
        freezeTableName: true,
        timestamps: false
    }
  )