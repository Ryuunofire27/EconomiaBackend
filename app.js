const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const multer = require('multer');
const routes = require('./routes/route');

const app = express();


app

  // Constantes 
  .set('port', 8080)
  .set('app', app)

  // Middlewares
  .use(bodyParser.json())
  .use(bodyParser.urlencoded({ extended: false }))
  // Rutas
  .use(routes);

module.exports = app;