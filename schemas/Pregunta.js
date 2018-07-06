const Sequelize = require('sequelize');
const sequelize = require('../database/db');
const Pregunta_Alternativa = require('./Pregunta_alternativa');
const Alternativa = require('./Alternativa');

const Segmento = require('./Segmento');

const Pregunta = sequelize.define('pregunta', {
  id_pregunta: { type: Sequelize.INTEGER, allowNull: false, autoIncrement: true, primaryKey: true },
  nmr_pregunta: { type: Sequelize.DECIMAL(6, 2) , allowNull: false },
  pregunta: { type: Sequelize.STRING, allowNull: false }
}, {
  tableName: 'PREGUNTAS'
});

module.exports = Pregunta;