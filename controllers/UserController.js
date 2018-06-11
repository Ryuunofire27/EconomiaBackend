const um = require('../models/UserModel');

exports.getAll = (req, res) => {
  um.getAll((err, users) => {
    if(err) return res.status(500).send({ err: 'Error en la peticion' });
    res.send(users);
  });
}