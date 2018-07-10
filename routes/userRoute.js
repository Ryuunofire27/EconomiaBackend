const route = require('express').Router();
const uc = require('../controllers/UserController');

route
  .get('/', uc.getAll)
  .get('/:id', uc.get)
  .get('/:id/encuestas', uc.getEncuestasByUser)
  .post('/', uc.register)
  .post('/login', uc.login)
  .post('/:id/changePassword', uc.changePassword)
  .post('/:id/resetPassword', uc.resetPassword)
  .delete('/:id', uc.delete)
  

module.exports = route;