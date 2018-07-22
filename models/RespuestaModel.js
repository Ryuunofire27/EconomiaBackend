const sequelize = require('../database/db');
const Respuesta = require('../schemas/Respuesta');

exports.getAll = () => {

};

exports.insert = (respuestas, cb) => {
  sequelize.transaction((t) => {
    return Respuesta
      .bulkCreate(respuesta)
  })
  .then(() => {
    cb({ msg: 'Se guardaron las respuestas exitosamente' }, 201);
  })
  .catch(err => cb(err, 500));
};