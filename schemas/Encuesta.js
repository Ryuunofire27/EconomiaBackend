const Sequelize = require('sequelize');
const sequelize = require('../database/db');
const Investigador = require('./Investigador');
const Segmento = require('./Segmento');

const Encuesta = sequelize.define('encuesta', {
  id_encuesta: { type: Sequelize.INTEGER, allowNull: false, autoIncrement: true, primaryKey: true },
  tema_encuesta: { type: Sequelize.STRING(50), allowNull: false },
  tiempo_habil: { type: Sequelize.STRING(45) }, 
  fecha_creacion: { type: Sequelize.DATE, allowNull: false },
  fecha_inicio: { type: Sequelize.DATE },
  fecha_termino: { type: Sequelize.DATE }
}, {
  tableName: 'ENCUESTAS'
});

Encuesta.belongsTo(Investigador, { foreignKey: 'id_investigador' });
Encuesta.hasMany(Segmento, { as: 'segmentos', foreignKey: 'id_encuesta' });

module.exports = Encuesta;