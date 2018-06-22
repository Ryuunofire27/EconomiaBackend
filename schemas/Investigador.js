const Sequelize = require('sequelize');
const sequelize = require('../database/db');
const User = require('./User');
const Encuesta = require('./Encuesta');

const Investigador = sequelize.define('investigador', {
  id_investigador: { type: Sequelize.INTEGER, allowNull: false, autoIncrement: true, primaryKey: true },
  universidad: { type: Sequelize.STRING, allowNull: false } 
}, {
  tableName: 'INVESTIGADORES'
});

Investigador.belongsTo(User, { foreignKey: 'id_usuario' });

Investigador.hasMany(Encuesta, {foreignKey: 'id_investigador'});
Encuesta.belongsTo(Investigador, { foreignKey: 'id_investigador' });

module.exports = Investigador;