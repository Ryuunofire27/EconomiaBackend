const Sequelize = require('sequelize');
const sequelize = require('../database/db');
const Pregunta_Alternativa = require('./Pregunta_alternativa');
const Alternativa = require('./Alternativa');
const Subpregunta = requrie('./Subpregunta');

const Segmento = require('./Segmento');

const Pregunta = sequelize.define('pregunta', {
  id_pregunta: { type: Sequelize.INTEGER, allowNull: false, autoIncrement: true, primaryKey: true },
  pregunta: { type: Sequelize.STRING, allowNull: false }
}, {
  tableName: 'PREGUNTAS'
});

module.exports = Pregunta;