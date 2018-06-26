const Sequelize = require('sequelize');
const sequelize = require('../database/db');

const Zona = require('./Zona');

const Sector = require('./Sector');
const Tipo_empresa = require('./Tipo_empresa');

const Encuestado = sequelize.define('encuestado', {
  id_encuestado: { type: Sequelize.INTEGER, allowNull: false, autoIncrement: true, primaryKey: true },
  ruc: { type: Sequelize.STRING(11), allowNull: false },
  razon_social: { type: Sequelize.STRING, allowNull: false },
  representante: { type: Sequelize.STRING, allowNull: false }
}, {
  tableName: 'ENCUESTADOS'
});

// Encuestado.hasMany(Respuesta, {foreignKey: 'id_encuestado'});
// Respuesta.belongsTo(Encuestado, { foreignKey: 'id_encuestado'});

Encuestado.belongsTo(Zona, { foreignKey: 'cod_zona' });

Encuestado.belongsTo(Sector, { foreignKey: 'id_sector' });

Encuestado.belongsTo(Tipo_empresa, { foreignKey: 'id_tipo_empresa' });
module.exports = Encuestado;