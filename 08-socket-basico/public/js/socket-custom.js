
var socket = io();

socket.on('connect', function(){
  console.log('conectado al servidor socket');
});

socket.on('disconnect', function(){
  console.log('perdimos conexion con el servidor');
});

// envia mensajes al server
socket.emit('enviarMensaje', {
    usuario: 'CarlosRene',
    mensaje: 'Quiubo Carnalonnnn'
}, function(resp){
  console.log('respuesta server: ', resp);
});

// recibe mensajes del server
socket.on('enviarMensaje', function(mensaje){
  console.log(mensaje);
});
