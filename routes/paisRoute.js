const route = require('express').Router();
const pc = require('../controllers/PaisController');

route
  .get('/', pc.getAll)
  .post('/', pc.insert)
  .delete('/:id', pc.delete)

module.exports = route;