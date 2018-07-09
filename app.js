const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fileUpload = require('express-fileupload');
const routes = require('./routes/route');
const pug = require('pug');
const path = require('path');
const documentation = require('./controllers/DocumentationController');
const dotenv = require('dotenv');

const app = express();

dotenv.load({ path: '.env' })


app
  // Constantes 
  .set('port', 8080)
  .set('app', app)
  .set('views', path.join(__dirname, 'views'))
  .engine('html', require('ejs').renderFile)
  .set('view engine', 'html')

  // Middlewares
  .use(cors())
  .use(bodyParser.json())
  .use(bodyParser.urlencoded({ extended: false }))
  .use(fileUpload())

  // Rutas
  .use(routes)
  .get('/', documentation.getDocumentation);

module.exports = app;
