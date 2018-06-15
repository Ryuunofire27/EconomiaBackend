const route = require('express').Router();
const uc = require('../controllers/UserController');

route
  .get('/', uc.getAll)
  .post('/', uc.register)

module.exports = route;