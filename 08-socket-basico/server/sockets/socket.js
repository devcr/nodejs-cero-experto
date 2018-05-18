
const { io } = require('../server');

io.on('connect', (client) =>{
  console.log('Usuario conectado!!');

  client.emit('enviarMensaje', {
    usuario: 'administrador',
    mensaje: 'Bienvenido al grupo'
  });


  client.on('disconnect', (client) =>{
    console.log('!!Usuario desconectado!!');
  });

  // Escucha msgs del cliente
  // el callback se usa para validar entre cliente y server el exito o error de lo procesado
  client.on('enviarMensaje', (data, callback) =>{
    console.log(data);

    // broadcast permite enviar el mensaje a todos los clientes conectados
    client.broadcast.emit('enviarMensaje', data);

    // if( mensaje.usuario ){
    //   callback({
    //     resp: 'Todo bien'
    //   });
    // }else{
    //   callback({
    //     resp: 'Todo mal!!'
    //   });
    // }

  });

});
