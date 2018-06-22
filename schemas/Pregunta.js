const Sequelize = require('sequelize');
const sequelize = require('../database/db');
const Pregunta_alternativa = require('./Pregunta_alternativa');
const Respuesta = require('./Respuesta');

const Pregunta = sequelize.define('pregunta', {
  id_pregunta: { type: Sequelize.INTEGER, allowNull: false, autoIncrement: true, primaryKey: true },
  nmr_pregunta: { type: Sequelize.DECIMAL(6, 2) , allowNull: false },
  pregunta: { type: Sequelize.STRING, allowNull: false }
}, {
  tableName: 'PREGUNTAS'
});

Pregunta.hasMany(Pregunta_alternativa, {foreignKey: 'id_pregunta'});
Pregunta_alternativa.belongsTo(Pregunta, { foreignKey: 'id_pregunta'});

Pregunta.hasMany(Respuesta, {foreignKey: 'id_pregunta'});
Respuesta.belongsTo(Pregunta, { foreignKey: 'id_pregunta'});

module.exports = Pregunta;