const Sequelize = require('sequelize');
const sequelize = require('../database/db');

const Encuesta = sequelize.define('encuesta', {
  id_encuesta: { type: Sequelize.INTEGER, allowNull: false, autoIncrement: true, primaryKey: true },
  tema_encuesta: { type: Sequelize.STRING(50), allowNull: false },
  tiempo_habil: { type: Sequelize.STRING(45), allowNull: false },
  fecha_creacion: { type: Sequelize.DATE, allowNull: false },
  fecha_inicio: { type: Sequelize.DATE, allowNull: false },
  fecha_termino: { type: Sequelize.DATE, allowNull: false }
}, {
  tableName: 'ENCUESTAS'
});

module.exports = Encuesta;