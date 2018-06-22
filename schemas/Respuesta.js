const Sequelize = require('sequelize');
const sequelize = require('../database/db');


const Respuesta = sequelize.define('respuesta', {
  id_encuestado: { type: Sequelize.INTEGER, allowNull: false, primaryKey: true },
  id_pregunta: { type: Sequelize.INTEGER, allowNull: false, primaryKey: true },
  id_alternativa: { type: Sequelize.INTEGER, allowNull: false, primaryKey: true }
}, {
  tableName: 'RESPUESTAS'
});



module.exports = Respuesta;