const Zona = require('../schemas/Zona');

exports.getAll = (cb) => {
  Zona
    .findAll()
    .then((zonaFound) => {
      cb(null, zonaFound);
    })
    .catch(err => cb(err));
};

exports.get = (data,cb) => {
    let error;
    console.log("data es "+data);
    Zona.findById(data).then(objeto => {
      if(objeto!=null){
        console.log("Se ha encontrado la zona " + objeto.ciudad);
      }else{
        error = "ERROR : La zona buscada no existe.";
      }
      cb(error, objeto);
    });
}

exports.insert = (zona, cb) => {
  const newZona = Zona.build(zona);
  newZona
    .save()
    .then((zonaSaved) => cb(zonaSaved))
    .catch(err => cb(err));
}

exports.delete = (id, cb) => {
  Zona
    .findById(id)
    .then((zonaFound) => {
      return zonaFound.destroy();
    })
    .then((count) => {
      console.log(count);
      cb(null);
    })
    .catch(err => cb(err));
}