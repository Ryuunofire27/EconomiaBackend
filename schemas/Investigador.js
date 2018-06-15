const Sequelize = require('sequelize');
const sequelize = require('../database/db');
const User = require('./User');

const Investigador = sequelize.define('investigador', {
  id_investigador: { type: Sequelize.INTEGER, allowNull: false, autoIncrement: true, primaryKey: true },
  tipo_doc: { type: Sequelize.STRING, allowNull: false },
  codigo_sunedu: { type: Sequelize.STRING, allowNull: false },
  nacionalidad: { type: Sequelize.STRING, allowNull: false },
  universidad: { type: Sequelize.STRING, allowNull: false } 
}, {
  tableName: 'INVESTIGADORES'
});

Investigador.belongsTo(User, { foreignKey: 'id_usuario' })

module.exports = Investigador;