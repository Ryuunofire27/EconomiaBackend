const Sequelize = require('sequelize');
const sequelize = require('../database/db');


const Segmento = require('./Segmento');

const Pregunta = sequelize.define('pregunta', {
  id_pregunta: { type: Sequelize.INTEGER, allowNull: false, autoIncrement: true, primaryKey: true },
  nmr_pregunta: { type: Sequelize.DECIMAL(6, 2) , allowNull: false },
  pregunta: { type: Sequelize.STRING, allowNull: false }
}, {
  tableName: 'PREGUNTAS'
});

// Pregunta.hasMany(Pregunta_alternativa, {foreignKey: 'id_pregunta'});
// Pregunta_alternativa.belongsTo(Pregunta, { foreignKey: 'id_pregunta'});

// Pregunta.hasMany(Respuesta, {foreignKey: 'id_pregunta'});
// Respuesta.belongsTo(Pregunta, { foreignKey: 'id_pregunta'});

Pregunta.belongsTo(Segmento, { foreignKey: 'id_segmento' });

module.exports = Pregunta;