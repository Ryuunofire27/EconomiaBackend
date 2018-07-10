const em = require('../models/EncuestaModel');

exports.getAll = (req, res) => {
  const filters = {
    limit: req.query.limit || 10,
    page: req.query.page || 1
  }
  filters.limit = parseInt(filters.limit);
  filters.page = parseInt(filters.page);
  em.getAll(filters, (data, status) => {
    res.status(status).send(data);
  });
};

exports.get = (req, res) => {
  em.get(req.params.id, (err, encuesta) => {
    if (err) return res.status(500).send(err);
    res.send(encuesta);
  });
}

exports.getRespuestasByEncuesta = (req, res) => {
  em.getRespuestasByEncuesta(req.params.id, (data, status) => {
    res.status(status).send(data);
  })
}

exports.insert = (req, res) => {
  const data = {
    encuesta : {
      tema_encuesta: req.body.titulo_encuesta,
      fecha_creacion: new Date(),
      id_investigador: req.body.investigador,
      fecha_inicio: new Date(req.body.fecha_inicio),
      fecha_termino: new Date(req.body.fecha_termino)
    },
    segmentos: req.body.segmentos
  }
  em.insert(data, (data, status) => {
    res.status(status).send(data);
  });
}

exports.delete = (req, res) => {
  em.delete(req.params.id, (err) => {
    if(err) return res.status(500).send(err);
    res.send({ msg: 'Eliminacion exitosa' })
  })
}