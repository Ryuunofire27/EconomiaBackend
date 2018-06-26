const Sequelize = require('sequelize');
const sequelize = require('../database/db');

const Alternativa = require('./Alternativa');

const Encuestado = require('./Encuestado');
const Pregunta = require('./Pregunta');

const Respuesta = sequelize.define('respuesta', {
  id_encuestado: { type: Sequelize.INTEGER, allowNull: false, primaryKey: true },
  id_pregunta: { type: Sequelize.INTEGER, allowNull: false, primaryKey: true },
  id_alternativa: { type: Sequelize.INTEGER, allowNull: false, primaryKey: true }
}, {
  tableName: 'RESPUESTAS'
});

Respuesta.belongsTo(Alternativa, { foreignKey: 'id_alternativa'});

Respuesta.belongsTo(Encuestado, { foreignKey: 'id_encuestado'});

Respuesta.belongsTo(Pregunta, { foreignKey: 'id_pregunta'});

module.exports = Respuesta;