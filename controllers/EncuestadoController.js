const etm = require('../models/EncuestadoModel');

exports.getAll = (req, res) => {
  etm.getAll((err, encuestados) => {
    if (err) return res.status(500).send(err);
    res.send(encuestados);
  });
};

exports.insert = (req, res) => {
  if (!req.body.ruc || !req.body.razon_social || !req.body.representante) return res.status(401).send({ err: 'Falta llenar campos'})
  const encuestado = {
    ruc: req.body.ruc,
    razon_social: req.body.razon_social,
    representante: req.body.representante,
    cod_zona: req.body.cod_zona,
    id_sector: req.body.id_sector,
    id_tipo_empresa: req.body.id_tipo_empresa
  };
  etm.insert(encuestado, (err, encuestado) => {
    if(err) return res.status(500).send(err);
    res.send(encuestado);
  });
}

exports.delete = (req, res) => {
  etm.delete(req.params.id, (err) => {
    if(err) return res.status(500).send(err);
    res.send({ msg: 'Eliminacion exitosa' })
  })
}