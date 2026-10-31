
// npm install para descargar los paquetes...

// Sentry primero (monitoreo de errores)
var Sentry = require('./instrument');

// libreriuas
var validation = require('./libs/unalib');
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var port = process.env.PORT || 3000;

// root: presentar html
app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

// TEMPORAL (Lab 7): ruta para provocar un error controlado y verlo en Sentry.
// Solo existe si SENTRY_TEST_ROUTE=true. Retirar al terminar la prueba.
if (process.env.SENTRY_TEST_ROUTE === 'true') {
  app.get('/debug-sentry', function(req, res){
    throw new Error('Error de prueba controlado - Lab 7 Sentry');
  });
}

Sentry.setupExpressErrorHandler(app);

// escuchar una conexion por socket
io.on('connection', function(socket){
  // si se escucha "chat message"
  socket.on('Evento-Mensaje-Server', function(msg){

    msg =  validation.validateMessage(msg);
    // volvemos a emitir el mismo mensaje
    io.emit('Evento-Mensaje-Server', msg);
  });
});

if (require.main === module) {
  http.listen(port, function(){
    console.log('listening on *:' + port);
  });
}

module.exports = http;
