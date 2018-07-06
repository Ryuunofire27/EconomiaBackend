const tm = require('../models/TipoDocumentoModel');

exports.getAll = (req, res) => {
  tm.getAll((err, tipoDocumentos) => {
    if (err) return res.status(500).send(err);
    res.send(tipoDocumentos);
  });
};

exports.insert = (req, res) => {
  if (!req.body.nombre) return res.status(401).send({ err: 'Falta llenar campos'})
  const tipoDocumento = {
    nombre_documento: req.body.nombre.toUpperCase(),
    descrip_documento: req.body.descripcion
  };
  tm.insert(tipoDocumento, (err, tipoDocumento) => {
    if(err) return res.status(500).send(err);
    res.send(tipoDocumento);
  });
}

exports.delete = (req, res) => {
  tm.delete(req.params.id, (err) => {
    if(err) return res.status(500).send(err);
    res.send({ msg: 'Eliminacion exitosa' })
  })
}