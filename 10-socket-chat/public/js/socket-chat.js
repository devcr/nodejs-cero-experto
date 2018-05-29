var socket = io();

var params = new URLSearchParams(window.location.search);

if( !params.has('nombre') ){
  window.location = 'index.html';
  throw new Error('El nombre es ncesario');
}


var nombre = {
  nombre : params.get('nombre')
}

socket.on('connect', function() {
    console.log('Conectado al servidor');

    socket.emit('entrarChat', nombre, function(resp){
      console.log('usuarios conectados ', resp);


    });
});

// escuchar
socket.on('disconnect', function() {

    console.log('Perdimos conexión con el servidor');

});


// Enviar información
socket.emit('enviarMensaje', {
    usuario: 'Fernando',
    mensaje: 'Hola Mundo'
}, function(resp) {
    console.log('respuesta server: ', resp);
});

// Escuchar información
socket.on('crearMensaje', function(mensaje) {

    console.log('Servidor:', mensaje);

});


//Para cuando un usuario entra o sale del Chat
socket.on('listaPersona', function(personas){

  console.log(personas);

});


// mensaje privado
socket.on('mensajePrivado', function(mensaje){
  console.log('Mensaje privado: ', mensaje);
});
