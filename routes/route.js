const route = require('express').Router();
const ur = require('./userRoute');

route
  .use('/users', ur)

module.exports = route;