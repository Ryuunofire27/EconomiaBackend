const route = require('express').Router();
const etc = require('../controllers/EncuestadoController');

route
  .get('/', etc.getAll)
  .post('/', etc.insert)
  .delete('/:id', etc.delete)

module.exports = route;