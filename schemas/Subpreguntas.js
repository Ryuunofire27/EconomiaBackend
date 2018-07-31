const Sequelize = require('sequelize');
const sequelize = require('../database/db');
const Pregunta = require('./Pregunta');
const Subpregunta = sequelize.define('subpregunta', {
  id_subpregunta: { type: Sequelize.INTEGER, allowNull: false, autoIncrement: true, primaryKey: true },
  id_pregunta: { type: Sequelize.INTEGER, allowNull: false } 
}, {
  tableName: 'SUBPREGUNTAS'
});

Subpregunta.hasOne(Pregunta, { as: 'pregunta', foreignKey: 'id_pregunta' })

module.exports = Subpregunta;