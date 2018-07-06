const Sequelize = require('sequelize');
const sequelize = require('../database/db');

const Pregunta = require('./Pregunta');
const Alternativa = require('./Alternativa');

const Pregunta_alternativa = sequelize.define('pregunta_alternativa', {
  id_alternativa: { type: Sequelize.INTEGER, allowNull: false, primaryKey: true },
  id_pregunta: { type: Sequelize.INTEGER, allowNull: false, primaryKey: true }
}, {
  tableName: 'PREGUNTAS_ALTERNATIVAS'
});



module.exports = Pregunta_alternativa;