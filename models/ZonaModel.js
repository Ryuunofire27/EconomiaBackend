const Zona = require('../schemas/Zona');

exports.getAll = (cb) => {
  Zona
    .findAll()
    .then((zonaFound) => {
      cb(null, zonaFound);
    })
    .catch(err => cb(err));
};

exports.get = (ids,cb) => {
    Zona
      .findById(id)
      .then(objeto => {
        if(objeto) return cb(null, objeto);
        const error = { err : "La zona buscada no existe." };
        cb(error);
      })
      .catch(err => cb(err));
}

exports.insert = (zona, cb) => {
  const newZona = Zona.build(zona);
  newZona
    .save()
    .then((zonaSaved) => cb(null, zonaSaved))
    .catch(err => cb(err));
}

exports.delete = (id, cb) => {
  Zona
    .findById(id)
    .then((zonaFound) => {
      if (!zonaFound) return cb({ err: 'La zona a eliminar no existe' });
      zonaFound
        .destroy()
        .then((count) => {
          if (count === 0) return cb({ err: 'No se ha podido eliminar la zona' }) ;
          cb(null, { res: 'Zona eliminada exitosamente' });
        })
        .catch(err => cb(err));
    })
    .catch(err => cb(err));
}