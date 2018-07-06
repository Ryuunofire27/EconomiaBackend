const Sequelize = require('sequelize');
const sequelize = require('../database/db');

const Tipo_documento = sequelize.define('Tipo_documento', {
  id_tipo_documento: { type: Sequelize.INTEGER, allowNull: false, autoIncrement: true, primaryKey: true },
  nombre_documento: { type: Sequelize.STRING(20), allowNull: false },
  descrip_documento: { type: Sequelize.STRING(45) } 
}, {
  tableName: 'TIPOS_DOCUMENTO'
});

module.exports = Tipo_documento;
