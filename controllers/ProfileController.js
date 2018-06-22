const pm = require('../models/ProfileModel');

exports.getAll = (req, res) => {
  pm.getAll((err, perfiles) => {
    if (err) return res.status(500).send(err);
    res.send(perfiles);
  });
};

exports.insert = (req, res) => {
  if (!req.body.perfil) return res.status(401).send({ err: 'Falta llenar campos'});
  const perfil = {
    nombre_perfil: req.body.perfil.toUpperCase(),
    descripcion: req.body.descripcion
  };
  pm.insert(perfil, (err, perfil) => {
    if(err) return res.status(500).send(err);
    res.send(perfil);
  });
}

exports.delete = (req, res) => {
  pm.delete(req.params.id, (err) => {
    if(err) return res.status(500).send(err);
    res.send({ msg: 'Eliminacion exitosa' })
  })
}