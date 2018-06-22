const Pais = require('../schemas/Pais');

exports.getAll = (cb) => {
  Pais
    .findAll()
    .then((paisesFound) => {
      cb(null, paisesFound);
    })
    .catch(err => cb(err));
};

exports.insert = (pais, cb) => {
  const newPais = Pais.build(pais);
  newPais
    .save()
    .then((paisSaved) => cb(paisSaved))
    .catch(err => cb(err));
}

exports.delete = (id, cb) => {
  Pais
    .findById(id)
    .then((paisFound) => {
      return paisFound.destroy();
    })
    .then((count) => {
      console.log(count);
      cb(null);
    })
    .catch(err => cb(err));
}