const Sequelize = require('sequelize');
const sequelize = require('../database/db');
const Pregunta_Alternativa = require('./Pregunta_alternativa');
const Pregunta = require('./Pregunta');

const Alternativa = sequelize.define('alternativa', {
  id_alternativa: { type: Sequelize.INTEGER, allowNull: false, autoIncrement: true, primaryKey: true },
  alternativa: { type: Sequelize.STRING(20), allowNull: false } 
}, {
  tableName: 'ALTERNATIVAS'
});

module.exports = Alternativa;