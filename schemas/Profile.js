const Sequelize = require('sequelize');
const sequelize = require('../database/db');

const Profile = sequelize.define('profile', {
  id_perfil: { type: Sequelize.INTEGER, allowNull: false, autoIncrement: true, primaryKey: true },
  descripcion: Sequelize.STRING,
  nombre_perfil: Sequelize.STRING(20)
}, {
  tableName: 'PERFILES'
});


module.exports = Profile;