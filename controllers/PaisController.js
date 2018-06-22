const pm = require('../models/PaisModel');

exports.getAll = (req, res) => {
  pm.getAll((err, paises) => {
    if (err) return res.status(500).send(err);
    res.send(paises);
  });
};

exports.insert = (req, res) => {
  if (!req.body.pais) return res.status(401).send({ err: 'Falta llenar campos'})
  const pais = {
    nombre_pais: req.body.pais.toUpperCase()
  };
  pm.insert(pais, (err, pais) => {
    if(err) return res.status(500).send(err);
    res.send(pais);
  });
}

exports.delete = (req, res) => {
  pm.delete(req.params.id, (err) => {
    if(err) return res.status(500).send(err);
    res.send({ msg: 'Eliminacion exitosa' })
  })
}