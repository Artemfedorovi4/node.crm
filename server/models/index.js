const User = require('./User')
const Empl = require('./Emploeers')
const Role = require('./Role')

Empl.belongsTo(Role, {foreignKey: 'ROLE_ID'})
Role.hasMany(Empl, {foreignKey: 'ROLE_ID'})

User.belongsTo(Empl, {foreignKey: 'EMP_ID'})
Empl.belongsTo(Empl, {foreignKey: 'USER_ID'})

module.exports = {
    User,
    Empl,
    Role
}