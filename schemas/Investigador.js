const Sequelize = require('sequelize');
const sequelize = require('../database/db');
const User = require('./User');

const Tipo_documento = require('./Tipo_documento');
const Pais = require('./Pais');

const Investigador = sequelize.define('investigador', {
  id_investigador: { type: Sequelize.INTEGER, allowNull: false, autoIncrement: true, primaryKey: true },
  universidad: { type: Sequelize.STRING, allowNull: false } 
}, {
  tableName: 'INVESTIGADORES'
});

Investigador.belongsTo(User, { foreignKey: 'id_usuario' });

// Investigador.hasMany(Encuesta, {foreignKey: 'id_investigador'});
// Encuesta.belongsTo(Investigador, { foreignKey: 'id_investigador' });

Investigador.belongsTo(Tipo_documento, { foreignKey: 'id_tipo_documento' });

Investigador.belongsTo(Pais, { foreignKey: 'id_pais' });

module.exports = Investigador;