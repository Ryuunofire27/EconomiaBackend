const route = require('express').Router();
const ur = require('./userRoute');
const pr = require('./paisRoute');
const pror = require('./profileRoute');

route
  .use('/users', ur)
  .use('/paises', pr)
  .use('/profiles', pror)

module.exports = route;