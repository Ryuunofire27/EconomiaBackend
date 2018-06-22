const Sequelize = require('sequelize');
const sequelize = require('../database/db');
const Profile = require('./Profile');

const User = sequelize.define('user', {
  id_usuario: { type: Sequelize.INTEGER, allowNull: false, autoIncrement: true, primaryKey: true },
  codigo: { type: Sequelize.STRING(16), allowNull: false, unique: true },
  contrasenia: { type: Sequelize.STRING(60), allowNull: false },
  nombres: { type: Sequelize.STRING(30), allowNull: false },
  apellidos: { type: Sequelize.STRING(30), allowNull: false },
  telefono: Sequelize.STRING(9),
  celular: Sequelize.STRING(9),
  numero_doc: { type: Sequelize.STRING(15), allowNull: false },
  email: { type: Sequelize.STRING(50), allowNull: false, unique: true },
  genero: { type: Sequelize.STRING(1), allowNull: false },
  foto: { type: Sequelize.STRING(256), allowNull: false },
  status: { type: Sequelize.INTEGER, allowNull: false, defaultValue: 1 }
}, {
  tableName: 'USUARIOS'
});

User.belongsTo(Profile, { foreignKey: 'id_perfil' });



module.exports = User;
