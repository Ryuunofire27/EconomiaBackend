const Sequelize = require('sequelize');
const sequelize = require('../database/db');


const Sector = sequelize.define('sector', {
  id_sector: { type: Sequelize.INTEGER, allowNull: false, autoIncrement: true, primaryKey: true },
  nombre_sector: { type: Sequelize.STRING(50), allowNull: false }, 
  descripcion_sector: { type: Sequelize.STRING(100), allowNull: true }
}, {
  tableName: 'SECTORES'
});

// Sector.hasMany(Encuestado, {foreignKey: 'id_sector'});
// Encuestado.belongsTo(Sector, { foreignKey: 'id_sector' });

module.exports = Sector;