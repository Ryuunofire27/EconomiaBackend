const Sequelize = require('sequelize');
const sequelize = require('../database/db');

const User = sequelize.model('user', {
  id_user: { type: Sequelize.INTEGER, allowNull: false, autoIncrement: true, primaryKey: true }
}, {
  tableName: 'USER'
});

module.exports = User;
