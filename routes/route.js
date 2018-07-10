const route = require('express').Router();
const ur = require('./userRoute');
const pr = require('./paisRoute');
const pror = require('./profileRoute');
const er = require('./encuestaRoute');
const tr = require('./tipoDocumentoRoute');
const sr = require('./sectorRoute');
const ter = require('./tipoEmpresaRoute');

route
  .use('/usuarios', ur)
  .use('/paises', pr)
  .use('/perfiles', pror)
  .use('/encuestas', er)
  .use('/tipodocumentos', tr)
  .use('/sectores',sr)
  .use('/tipoempresas',ter)
  
module.exports = route;