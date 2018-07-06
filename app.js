const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const multer = require('multer');
const routes = require('./routes/route');
const pug = require('pug');
const path = require('path');

const app = express();


app
  // Constantes 
  .set('port', 8080)
  .set('app', app)
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'pug')

  // Middlewares
  /*.use(cors())
  .use(multer)*/
  .use(cors())
  .use(bodyParser.json())
  .use(bodyParser.urlencoded({ extended: false }))
  // Rutas
  .use(routes)
  .get('/', (req, res) => res.render('index'));

module.exports = app;