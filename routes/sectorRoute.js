const route = require('express').Router();
const sc = require('../controllers/SectorController');

route
  .get('/', sc.getAll)
  .post('/', sc.insert)
  .delete('/:id', sc.delete)

module.exports = route;