const route = require('express').Router();
const tc = require('../controllers/TipoDocumentoController');

route
  .get('/', tc.getAll)
  .post('/', tc.insert)
  .delete('/:id', tc.delete)

module.exports = route;