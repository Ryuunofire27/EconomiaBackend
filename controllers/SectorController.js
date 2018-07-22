const sm = require('../models/SectorModel');

exports.getAll = (req, res) => {
  sm.getAll((err, sectores) => {
    if (err) return res.status(500).send(err);
    res.send(sectores);
  });
};

exports.insert = (req, res) => {
  if (!req.body.nombre_sector) return res.status(401).send({ err: 'Falta llenar campos'})
  const sector = {
    nombre_sector: req.body.nombre_sector.toUpperCase(),
    descripcion_sector: req.body.descripcion_sector
  };
  sm.insert(sector, (err, sector) => {
    if(err) return res.status(500).send(err);
    res.send(sector);
  });
}

exports.delete = (req, res) => {
  sm.delete(req.params.id, (err) => {
    if(err) return res.status(500).send(err);
    res.send({ msg: 'Eliminacion exitosa' })
  })
}