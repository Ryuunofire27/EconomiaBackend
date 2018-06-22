const Sequelize = require('sequelize');
const sequelize = require('../database/db');
const Profile = require('./Profile');

const User = sequelize.define('user', {
  id_usuario: { type: Sequelize.INTEGER, allowNull: false, autoIncrement: true, primaryKey: true },
  codigo: { type: Sequelize.STRING(16), allowNull: false, unique: true },
  contrasenia: { type: Sequelize.STRING, allowNull: false },
  nombres: { type: Sequelize.STRING, allowNull: false },
  apellidos: { type: Sequelize.STRING, allowNull: false },
  telefono: Sequelize.STRING(9),
  celular: Sequelize.STRING(9),
  numero_doc: Sequelize.STRING(15),
  email: { type: Sequelize.STRING(50), allowNull: false, unique: true },
  genero: { type: Sequelize.STRING(1), allowNull: false },
  foto: { type: Sequelize.STRING, allowNull: false }
}, {
  tableName: 'USUARIOS'
});

User.belongsTo(Profile, { foreignKey: 'id_perfil' });



module.exports = User;
