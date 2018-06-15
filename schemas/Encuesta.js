const Sequelize = require('sequelize');
const sequelize = require('../database/db');

const Encuesta = sequelize.model('encuesta', {
  id_encuesta: { type: Sequelize.INTEGER, allowNull: false, autoIncrement: true, primaryKey: true },
  tiempo_habil: { type: Sequelize.INTEGER, allowNull: false },
  fecha_creacion: { type: Sequelize.TIMESTAMP, allowNull: false },
  fecha_inicio: { type: Sequelize.TIMESTAMP, allowNull: false },
  fecha_termino: { type: Sequelize.TIMESTAMP, allowNull: false }
}, {
  tableName: 'ENCUESTAS'
});

module.exports = Encuesta;