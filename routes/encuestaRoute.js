const route = require('express').Router();
const ec = require('../controllers/EncuestaController');

route
  .get('/', ec.getAll)
  .get('/:id', ec.get)
  .get('/:id/respuestas', ec.getRespuestasByEncuesta)
  .post('/', ec.insert)
  .delete('/:id', ec.delete)

module.exports = route;