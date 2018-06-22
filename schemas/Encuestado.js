const Sequelize = require('sequelize');
const sequelize = require('../database/db');

const Respuesta = require('./Respuesta');

const Encuestado = sequelize.define('encuestado', {
  id_encuestado: { type: Sequelize.INTEGER, allowNull: false, autoIncrement: true, primaryKey: true },
  ruc: { type: Sequelize.STRING(11), allowNull: false },
  razon_social: { type: Sequelize.STRING, allowNull: false },
  representante: { type: Sequelize.STRING, allowNull: false }
}, {
  tableName: 'ENCUESTADOS'
});

Encuestado.hasMany(Respuesta, {foreignKey: 'id_encuestado'});
Respuesta.belongsTo(Encuestado, { foreignKey: 'id_encuestado'});

module.exports = Encuestado;