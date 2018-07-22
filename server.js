const app = require('./app');

app.listen(app.get('port'), 
() => console.log('Aplicacion iniciada en http://localhost:%s ', 
app.get('port')));