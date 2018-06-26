const Sequelize = require('sequelize');
const sequelize = require('../database/db');


const Tipo_empresa = sequelize.define('tipo_empresa', {
  id_tipo_empresa: { type: Sequelize.INTEGER, allowNull: false, autoIncrement: true, primaryKey: true },
  tipo_empresa: { type: Sequelize.STRING(10), allowNull: false } 
}, {
  tableName: 'TIPOS_EMPRESA'
});

// Tipo_empresa.hasMany(Encuestado, {foreignKey: 'id_tipo_empresa'});
// Encuestado.belongsTo(Tipo_empresa, { foreignKey: 'id_tipo_empresa' });

module.exports = Tipo_empresa;