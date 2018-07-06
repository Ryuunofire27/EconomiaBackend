const em = require('../models/EncuestaModel');

exports.getAll = (req, res) => {
  em.getAll((err, encuestas) => {
    if (err) return res.status(500).send(err);
    res.send(encuestas);
  });
};

exports.insert = (req, res) => {
  const { bloque_segmento } = req.body;
  const encuesta = {
    tema_encuesta: req.body.titulo_encuesta,
    fecha_creacion: new Date(),
    id_investigador: 1
  };
  encuesta.segmentos = bloque_segmento.map((b) => {
    const tema_segmento = b.titulo;
    const preguntas = b.bloque_pregunta.map((p) => {
      const id_tipo_pregunta = p.type;
      return { id_tipo_pregunta, pregunta: p.pregunta, alternativas: p.alternativas };
    });
    return { tema_segmento, preguntas };
  });
  em.insert(encuesta, (err, encuesta) => {
    if(err) return res.status(500).send(err);
    res.send(encuesta);
  });
}

exports.delete = (req, res) => {
  pm.delete(req.params.id, (err) => {
    if(err) return res.status(500).send(err);
    res.send({ msg: 'Eliminacion exitosa' })
  })
}