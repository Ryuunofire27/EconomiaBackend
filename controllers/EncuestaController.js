const em = require('../models/EncuestaModel');

exports.getAll = (req, res) => {
  em.getAll((err, encuestas) => {
    if (err) return res.status(500).send(err);
    res.send(encuestas);
  });
};

exports.get = (req, res) => {
  em.get(req.params.id, (err, encuesta) => {
    if (err) return res.status(500).send(err);
    res.send(encuesta);
  });
}

exports.insert = (req, res) => {
  const { bloque_segmento } = req.body;
  const data = {};
  data.encuesta = {
    tema_encuesta: req.body.titulo_encuesta,
    fecha_creacion: new Date(),
    id_investigador: req.body.investigador
  };
  data.segmentos = bloque_segmento.map((b) => {
    const tema_segmento = b.titulo;
    const preguntas = b.bloque_pregunta.map((p) => {
      return { nmr_pregunta: p.nmr, pregunta: p.pregunta, alternativas: p.alternativas };
    });
    return { tema_segmento, preguntas };
  });
  em.insert(data, (err, encuesta) => {
    if(err) return res.status(500).send(err);
    res.send(encuesta);
  });
}

exports.delete = (req, res) => {
  em.delete(req.params.id, (err) => {
    if(err) return res.status(500).send(err);
    res.send({ msg: 'Eliminacion exitosa' })
  })
}