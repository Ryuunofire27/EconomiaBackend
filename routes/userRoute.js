const route = require('express').Router();
const uc = require('../controllers/UserController');

route
  .get('/', uc.getAll)

module.exports = route;