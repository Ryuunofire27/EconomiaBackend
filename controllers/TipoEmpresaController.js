const tem = require('../models/TipoEmpresaModel');

exports.getAll = (req, res) => {
  tem.getAll((err, tipoEmpresas) => {
    if (err) return res.status(500).send(err);
    res.send(tipoEmpresas);
  });
};

exports.insert = (req, res) => {
  if (!req.body.tipo_empresa) return res.status(401).send({ err: 'Falta llenar campos'})
  const tipoEmpresa = {
    tipo_empresa: req.body.tipo_empresa.toUpperCase()
  };
  tem.insert(tipoEmpresa, (err, tipoEmpresa) => {
    if(err) return res.status(500).send(err);
    res.send(tipoEmpresa);
  });
}

exports.delete = (req, res) => {
  tem.delete(req.params.id, (err) => {
    if(err) return res.status(500).send(err);
    res.send({ msg: 'Eliminacion exitosa' })
  })
}