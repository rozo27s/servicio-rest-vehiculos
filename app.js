var express = require('express');
var cookieParser = require('cookie-parser');
var http = require('http');
var path = require('path');
var bodyParser = require('body-parser'),  port = 3000;
var app = express();
const config = require('./config');
//============================CONFIGURACION DE CORS====================================
const cors = require('cors');
app.use(cors(
  config.application.cors.server
));
//====================================MODIFICAR AQUI====================================
var user = require('./routes/tipdocs');
var user2 = require('./routes/colores');
var user3 = require('./routes/conductores');
var user4 = require('./routes/estadoconductor');
var user5 = require('./routes/categoriaslicencias');
var user6 = require('./routes/estadosservicios');
var user7 = require('./routes/estadosvehiculos');
var user8 = require('./routes/marcasvehiculos');
var user9 = require('./routes/sexo');
var user10 = require('./routes/tiposvehiculos');
var user11 = require('./routes/asignaciones');
var user12 = require('./routes/eventosvehiculos');
var user13 = require('./routes/servicios');
var user14 = require('./routes/vehiculos');
//======================================================================================
app.set('port', process.env.PORT || port);
app.use(bodyParser.json({ type: 'application/json', limit: '10mb' }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
//====================================MODIFICAR AQUI====================================
app.use('/api',user());
app.use('/api',user2());
app.use('/api',user3());
app.use('/api',user4());
app.use('/api',user5());
app.use('/api',user6());
app.use('/api',user7());
app.use('/api',user8());
app.use('/api',user9());
app.use('/api',user10());
app.use('/api',user11());
app.use('/api',user12());
app.use('/api',user13());
app.use('/api',user14());
//========================================================== Configurar cabeceras y cors
app.use(cors(
  config.application.cors.server
));
//====================================================================================== 
http.createServer(app).listen(app.get('port'), function(){
  console.log('Servidor EXPRESS habilitado: puerto = ' + app.get('port'));
});

module.exports = app;