const Sequelize = require('sequelize');
const sequelize = require('../database/db');



const Alternativa = sequelize.define('alternativa', {
  id_alternativa: { type: Sequelize.INTEGER, allowNull: false, autoIncrement: true, primaryKey: true },
  alternativa: { type: Sequelize.STRING(20), allowNull: false } 
}, {
  tableName: 'ALTERNATIVAS'
});

// Alternativa.hasMany(Pregunta_alternativa, {foreignKey: 'id_alternativa'});
// Pregunta_alternativa.belongsTo(Alternativa, { foreignKey: 'id_alternativa'});

// Alternativa.hasMany(Respuesta, {foreignKey: 'id_alternativa'});
// Respuesta.belongsTo(Alternativa, { foreignKey: 'id_alternativa'});


module.exports = Alternativa;