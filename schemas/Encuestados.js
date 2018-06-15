const Sequelize = require('sequelize');
const sequelize = require('../database/db');

const Encuestado = sequelize.model('encuestado', {
  id_encuestado: { type: Sequelize.INTEGER, allowNull: false, autoIncrement: true, primaryKey: true },
  cod_zona: { type: Sequelize.INTEGER, allowNull: false },
  sector: { type: Sequelize.STRING, allowNull: false },
  ruc: { type: Sequelize.STRING, allowNull: false },
  razon_social: { type: Sequelize.STRING, allowNull: false },
  representante: { type: Sequelize.STRING, allowNull: false },
  tipo_empresa: { type: Sequelize.STRING, allowNull: false }
}, {
  tableName: 'ENCUESTADOS'
});

module.exports = Encuestado;