const express = require('express');

const path = require('path');
const http = require('http');
const socketIO = require('socket.io');


const app = express();

let server = http.createServer(app);

const publicPath = path.resolve(__dirname, '../public');
const port = process.env.PORT || 3000;

app.use(express.static(publicPath));

//let io = socketIO(server);
module.exports.io = socketIO(server);
require('./sockets/socket');


server.listen(port, (err) => {
    if (err) throw new Error(err);
    console.log(`Servidor corriendo en puerto ${ port }`);
});
