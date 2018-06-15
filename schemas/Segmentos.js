const Sequelize = require('sequelize');
const sequelize = require('../database/db');

const Segmento = sequelize.model('segmento', {
  id_segmento: { type: Sequelize.INTEGER, allowNull: false, autoIncrement: true, primaryKey: true },
  nombre: { type: Sequelize.STRING, allowNull: false },
}, {
  tableName: 'SEGMENTOS'
});

module.exports = Segmento;