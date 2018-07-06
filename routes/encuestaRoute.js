const route = require('express').Router();
const ec = require('../controllers/EncuestaController');

route
  .get('/', ec.getAll)
  .post('/', ec.insert)
  .delete('/:id', ec.delete)

module.exports = route;