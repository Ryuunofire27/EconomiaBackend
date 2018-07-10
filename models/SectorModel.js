const Sector = require('../schemas/Sector');

exports.getAll = (cb) => {
  Sector
    .findAll()
    .then((sectoresFound) => {
      cb(null, sectoresFound);
    })
    .catch(err => cb(err));
};

exports.insert = (sector, cb) => {
  const newSector = Sector.build(sector);
  newSector
    .save()
    .then((sectorSaved) => cb(sectorSaved))
    .catch(err => cb(err));
}

exports.delete = (id, cb) => {
  Sector
    .findById(id)
    .then((sectorFound) => {
      return sectorFound.destroy();
    })
    .then((count) => {
      console.log(count);
      cb(null);
    })
    .catch(err => cb(err));
}