const zm = require('../models/ZonaModel');

exports.getAll = (req, res) => {
  zm.getAll((err, zonas) => {
    if (err) return res.status(500).send(err);
    res.send(zonas);
  });
};

exports.get = (req, res) => {
  const cod_zona = req.params.cod_zona;
  zm.get(cod_zona, (err, zona) => {
    if(err) return res.status(500).send(err);
    res.send(zona);
  });
}

exports.insert = (req, res) => {
 if (!req.body.ciudad) return res.status(401).send({ err: 'Falta llenar campos'});
  const zona = {
    ciudad: req.body.ciudad.toUpperCase(),
    estado_provincia: req.body.estado_provincia,
    id_pais: req.body.id_pais
  };
  zm.insert(zona, (err, zona) => {
    if(err) return res.status(500).send(err);
    res.send(zona);
  });
}

exports.delete = (req, res) => {
  zm.delete(req.params.cod_zona, (err) => {
    if(err) return res.status(500).send(err);
    res.send({ msg: 'Eliminacion exitosa' })
  })
}