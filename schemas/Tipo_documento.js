const Sequelize = require('sequelize');
const sequelize = require('../database/db');
const Investigador = require('./Investigador');

const Tipo_documento = sequelize.define('Tipo_documento', {
  id_tipo_documento: { type: Sequelize.INTEGER, allowNull: false, autoIncrement: true, primaryKey: true },
  nombre_documento: { type: Sequelize.STRING(20), allowNull: false },
  descrip_documento: { type: Sequelize.STRING(45), allowNull: true } 
}, {
  tableName: 'TIPOS_DOCUMENTO'
});

Tipo_documento.hasMany(Investigador, {foreignKey: 'id_tipo_documento'});
Investigador.belongsTo(Tipo_documento, { foreignKey: 'id_tipo_documento' });

module.exports = Tipo_documento;