const Sequelize = require('sequelize');
const sequelize = require('../database/db');
const Encuestado = require('./Encuestado');

const Zona = sequelize.define('zona', {
  cod_zona: { type: Sequelize.INTEGER, allowNull: false, autoIncrement: true, primaryKey: true },
  ciudad: { type: Sequelize.STRING(45), allowNull: true }, 
  estado_provincia: { type: Sequelize.STRING(45), allowNull: true }
}, {
  tableName: 'ZONAS'
});

Zona.hasMany(Encuestado, {foreignKey: 'cod_zona'});
Encuestado.belongsTo(Zona, { foreignKey: 'cod_zona' });

module.exports = Zona;