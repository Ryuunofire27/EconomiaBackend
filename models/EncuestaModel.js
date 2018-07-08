const Encuesta = require('../schemas/Encuesta');
const Pregunta = require('../schemas/Pregunta');
const PreguntaAlternativa = require('../schemas/Pregunta_alternativa');
const Segmento = require('../schemas/Segmento');
const Alternativa = require('../schemas/Alternativa');
const sequelize = require('../database/db');

Pregunta.belongsToMany(Alternativa, {
  through: {
    model: PreguntaAlternativa,
    unique: false,
  },
  foreignKey: 'id_pregunta',
  constraints: false,
  as: 'preguntas'
});
Alternativa.belongsToMany(Pregunta, {
  through: {
    model: PreguntaAlternativa,
    unique: false
  },
  foreignKey: 'id_alternativa',
  constraints: false,
  as: 'alternativas'
});

exports.getAll = (cb) => {
  let en = {};
  Encuesta
    .findAll({
      limit: 1,
      include: [{
        model: Segmento,
        as: 'segmentos',
        include: [{
          model: Pregunta,
          as: 'preguntas'
        }]
      }]
    })
    .then((encuestas) => {
      en = encuestas;
      return Promise.all(
        en.map((e) => {
          return Promise.all(
            e.segmentos.map((s) => {
              return Promise.all(
                s.preguntas.map((p) => {
                  p.dataValues.alternativas = [];
                  return PreguntaAlternativa
                    .findAll({
                      where: { id_pregunta: p.id_pregunta }
                    })
                    .then((pas) => {
                      return Promise.all(
                        pas.map((pas) => {
                          return Alternativa
                            .findAll({ where: {
                              id_alternativa: pas.id_alternativa
                            }})
                            .then((alternativas) => {
                              p.dataValues.alternativas.push(alternativas[0]);
                            });
                        })
                      )
                    })
                })
            )
            })
          )
        })
      )
    })
    .then(() => {
      cb(null, en);
    })
    .catch(err => cb(err))
}

exports.get = (id, cb) => {
  let en = {};
  Encuesta
    .findById(id, {
      include: [{
        model: Segmento,
        as: 'segmentos',
        include: [{
          model: Pregunta,
          as: 'preguntas'
        }]
      }]
    })
    .then((encuesta) => {
      en = encuesta;
      return Promise.all(
        en.segmentos.map((s) => {
          return Promise.all(
            s.preguntas.map((p) => {
              p.dataValues.alternativas = [];
              return PreguntaAlternativa
                .findAll({
                  where: { id_pregunta: p.id_pregunta }
                })
                .then((pas) => {
                  return Promise.all(
                    pas.map((pas) => {
                      return Alternativa
                        .findAll({ where: {
                          id_alternativa: pas.id_alternativa
                        }})
                        .then((alternativas) => {
                          p.dataValues.alternativas.push(alternativas[0]);
                        });
                    })
                  )
                })
            })
        )
        })
      )
    })
    .then(() => {
      cb(null, en);
    })
    .catch(err => cb(err))
}

exports.insert = (data, cb) => {
  return sequelize.transaction((t) => {
    return Encuesta
      .create(data.encuesta, {transaction: t})
      .then((encuestaSaved) => {
        return Promise.all(
          data.segmentos.map((s) => {
            s.id_encuesta = encuestaSaved.id_encuesta;
            const preguntas = s.preguntas;
            delete s['preguntas'];
            return Segmento
              .create(s, { transaction: t })
              .then((segmentoSaved) => {
                return Promise.all(
                  preguntas.map((p) => {
                    p.id_segmento = segmentoSaved.id_segmento;
                    if(p.alternativas){
                      const alternativas = p.alternativas;
                      delete p['alternativas'];
                      return Pregunta
                        .create(p, { transaction: t })
                        .then((preguntaSaved) => {
                          return Promise.all(
                            alternativas.map((a) => {
                              return Alternativa
                                .create(a, { transaction: t })
                                .then((alternativaSaved) => {
                                  return PreguntaAlternativa
                                    .create({
                                      id_alternativa: alternativaSaved.id_alternativa,
                                      id_pregunta: preguntaSaved.id_pregunta
                                    }, { transaction: t })
                                })
                            })
                          )
                        });
                    }else{
                      return Pregunta
                        .create(p, { transaction: t })
                    }
                  })
                );
              })
          })  
        );
      });
  })
  .then(result => cb(null, { msg: 'Insercion exitosa' }))
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