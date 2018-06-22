const Sequelize = require('sequelize');
const sequelize = require('../database/db');
const Encuesta = require('./Encuesta');
const Pregunta = require('./Pregunta');

const Segmento = sequelize.define('segmento', {
  id_segmento: { type: Sequelize.INTEGER, allowNull: false, autoIncrement: true, primaryKey: true },
  tema_segmento: { type: Sequelize.STRING(100), allowNull: false },
}, {
  tableName: 'SEGMENTOS'
});

Segmento.belongsTo(Encuesta, { foreignKey: 'id_encuesta' })

Segmento.hasMany(Pregunta, {foreignKey: 'id_segmento'});
Pregunta.belongsTo(Segmento, { foreignKey: 'id_segmento' });

module.exports = Segmento;