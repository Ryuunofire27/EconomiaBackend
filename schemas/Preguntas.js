const Sequelize = require('sequelize');
const sequelize = require('../database/db');

const Pregunta = sequelize.model('pregunta', {
  id_pregunta: { type: Sequelize.INTEGER, allowNull: false, autoIncrement: true, primaryKey: true },
  nmr_pregunta: { type: Sequelize.INTEGER, allowNull: false },
  pregunta: { type: Sequelize.STRING, allowNull: false }
}, {
  tableName: 'PREGUNTAS'
});

module.exports = Pregunta;