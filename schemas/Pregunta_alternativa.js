const Sequelize = require('sequelize');
const sequelize = require('../database/db');

const Pregunta = require('./Pregunta');
const Alternativa = require('./Alternativa');

const Pregunta_alternativa = sequelize.define('pregunta_alternativa', {
  id_alternativa: { type: Sequelize.INTEGER, allowNull: false, primaryKey: true },
  id_pregunta: { type: Sequelize.INTEGER, allowNull: false, primaryKey: true }
}, {
  tableName: 'PREGUNTAS_ALTERNATIVA'
});

Pregunta_alternativa.belongsTo(Pregunta, { foreignKey: 'id_pregunta'});

Pregunta_alternativa.belongsTo(Alternativa, { foreignKey: 'id_alternativa'});

module.exports = Pregunta_alternativa;