const route = require('express').Router();
const tec = require('../controllers/TipoEmpresaController');

route
  .get('/', tec.getAll)
  .post('/', tec.insert)
  .delete('/:id', tec.delete)

module.exports = route;