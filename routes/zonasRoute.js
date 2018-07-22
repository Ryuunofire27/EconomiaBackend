const route = require('express').Router();
const zc = require('../controllers/ZonaController');

route
  .get('/', zc.getAll)
  .post('/', zc.insert)
  .delete('/:id', zc.delete)

module.exports = route;