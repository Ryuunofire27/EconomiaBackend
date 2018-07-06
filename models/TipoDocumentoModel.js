const TipoDocumento = require('../schemas/Tipo_documento');

exports.getAll = (cb) => {
  TipoDocumento
    .findAll()
    .then((tipoDocumentosFound) => {
      cb(null, tipoDocumentosFound);
    })
    .catch(err => cb(err));
};

exports.insert = (tipoDocumento, cb) => {
  const newTipoDocumento = TipoDocumento.build(tipoDocumento);
  newTipoDocumento
    .save()
    .then((tipoDocumentoSaved) => cb(tipoDocumentoSaved))
    .catch(err => cb(err));
}

exports.delete = (id, cb) => {
  TipoDocumento
    .findById(id)
    .then((tipoDocumentoFound) => {
      return tipoDocumentoFound.destroy();
    })
    .then((count) => {
      console.log(count);
      cb(null);
    })
    .catch(err => cb(err));
}