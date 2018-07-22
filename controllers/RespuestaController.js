const rm = require('../models/RespuestaModel');

exports.getAll = () => {

};

exports.insert = (req, res) => {
  const respuestas = req.body;
  rm.insert(respuestas, (data, status) => {
    res.status(status).send(data);
  });
};
