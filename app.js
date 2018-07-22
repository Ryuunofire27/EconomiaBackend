const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fileUpload = require('express-fileupload');
const routes = require('./routes/route');
const documentation = require('./controllers/DocumentationController');
const dotenv = require('dotenv');

const app = express();

dotenv.load({ path: '.env' })


app
  // Constantes 
  .set('port', 8080)
  .set('app', app)
  
  // Middlewares
  .use(express.static(__dirname+'/views'))
  .use(cors())
  .use(bodyParser.json())
  .use(bodyParser.urlencoded({ extended: false }))
  .use(fileUpload())

  // Rutas
  .use(routes)
  .get('/', documentation.getDocumentation);

module.exports = app;
