const Sequelize = require('sequelize');
const sequelize = require('../database/db');
const Pregunta = require('./Pregunta');
const Encuesta = require('./Encuesta');


const Segmento = sequelize.define('segmento', {
  id_segmento: { type: Sequelize.INTEGER, allowNull: false, autoIncrement: true, primaryKey: true },
  tema_segmento: { type: Sequelize.STRING(100), allowNull: false },
}, {
  tableName: 'SEGMENTOS'
});

Segmento.hasMany(Pregunta, { as: 'preguntas' ,foreignKey: 'id_segmento' });

module.exports = Segmento;