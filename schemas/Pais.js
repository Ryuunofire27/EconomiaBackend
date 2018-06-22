const Sequelize = require('sequelize');
const sequelize = require('../database/db');
const Zona = require('./Zona');
const Investigador = require('./Investigador');

const Pais = sequelize.define('pais', {
  id_pais: { type: Sequelize.INTEGER, allowNull: false, autoIncrement: true, primaryKey: true },
  nombre_pais: { type: Sequelize.STRING(45), allowNull: false } 
}, {
  tableName: 'PAISES'
});

Pais.hasMany(Zona, {foreignKey: 'id_pais'});
Zona.belongsTo(Pais, { foreignKey: 'id_pais' });

Pais.hasMany(Investigador, {foreignKey: 'id_pais'});
Investigador.belongsTo(Pais, { foreignKey: 'id_pais' });

module.exports = Pais;