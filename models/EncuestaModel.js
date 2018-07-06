const Encuesta = require('../schemas/Encuesta');
const Pregunta = require('../schemas/Pregunta');
const PreguntaAlternativa = require('../schemas/Pregunta_alternativa');
const Segmento = require('../schemas/Segmento');
const Alternativa = require('../schemas/Alternativa');

exports.getAll = (cb) => {
  Encuesta
    .find()
    .then((encuestas) => {
      cb(null, encuestas);
    })
    .catch(err => cb(err))
}

exports.get = (id, cb) => {
  Encuesta
    .findById(id)
    .then((encuesta) => {
      if(!encuesta) throw new Error("No existe una encuesta con el id indicado");
      cb(null, encuesta);
    })
    .catch(err => cb(err));
}

exports.insert = (encuesta, cb) => {
  console.log(encuesta);
  Encuesta
    .create(encuesta,{
      include: [ {
        model: Segmento,
        as: 'segmentos',
        include: [ {
          model: Pregunta,
          as: 'preguntas',
          include:  [{
            model: Alternativa,
            as: 'alternativas'
          }]
        }]
      }]
    })
    .then(encuestaSaved => {
      cb(encuestaSaved);
    })
    .catch(err => cb(err));
};

exports.delete = (id, cb) => {
  Encuesta
    .findById(id)
    .then((encuesta) => {
      if(!encuesta) throw new Error("No existe una encuesta con el id indicado");
      return encuesta.destroy();
    })
    .then((count) => {
      if(count == 0) throw new Error("No se pudo eliminar la encuesta");
      cb(null); 
    })
    .catch(err => cb(err));
}