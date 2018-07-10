const TipoEmpresa = require('../schemas/Tipo_empresa');

exports.getAll = (cb) => {
  TipoEmpresa
    .findAll()
    .then((tipoEmpresasFound) => {
      cb(null, tipoEmpresasFound);
    })
    .catch(err => cb(err));
};

exports.insert = (tipoEmpresa, cb) => {
  const newTipoEmpresa = TipoEmpresa.build(tipoEmpresa);
  newTipoEmpresa
    .save()
    .then((tipoEmpresaSaved) => cb(tipoEmpresaSaved))
    .catch(err => cb(err));
}

exports.delete = (id, cb) => {
  TipoEmpresa
    .findById(id)
    .then((tipoEmpresaFound) => {
      return tipoEmpresaFound.destroy();
    })
    .then((count) => {
      console.log(count);
      cb(null);
    })
    .catch(err => cb(err));
}