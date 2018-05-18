const express = require('express');

const path = require('path');
const http = require('http');
const socketIO = require('socket.io');


const app = express();

let server = http.createServer(app);

const publicPath = path.resolve(__dirname, '../public');
const port = process.env.PORT || 3000;

app.use(express.static(publicPath));

let io = socketIO(server);

io.on('connect', (client) =>{
  console.log('Usuario conectado!!');

  client.on('disconnect', (client) =>{
    console.log('!!Usuario desconectado!!');
  });

  client.on('enviarMensaje', (mensaje) =>{
    console.log(mensaje);
  });

});

server.listen(port, (err) => {

    if (err) throw new Error(err);

    console.log(`Servidor corriendo en puerto ${ port }`);

});
