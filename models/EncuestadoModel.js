const Encuestado = require('../schemas/Encuestado');

exports.getAll = (cb) => {
  Encuestado
    .findAll()
    .then((encuestadosFound) => {
      cb(null, encuestadosFound);
    })
    .catch(err => cb(err));
};

exports.insert = (encuestado, cb) => {
  const newEncuestado = Encuestado.build(encuestado);
  newEncuestado
    .save()
    .then((encuestadoSaved) => cb(encuestadoSaved))
    .catch(err => cb(err));
}

exports.delete = (id, cb) => {
  Encuestado
    .findById(id)
    .then((encuestadoFound) => {
      return encuestadoFound.destroy();
    })
    .then((count) => {
      console.log(count);
      cb(null);
    })
    .catch(err => cb(err));
}