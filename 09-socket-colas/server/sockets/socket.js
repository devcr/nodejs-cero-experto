const { io } = require('../server');
const { TicketControl } = require('../classes/ticket-control');

const ticketControl = new TicketControl();


io.on('connection', (client) => {

    console.log('Usuario conectado');

    // recibe msg del cliente para generar siguiente ticket
    // en este caso data llegara null, porque asi llega desde el cliente
    client.on('siguienteTicket', (data, callback) =>{

      let siguiente = ticketControl.siguiente();
      console.log('Siguiente ticket--> ', siguiente);

      // se envia al cliente el dato siguiente que se genero
      //client.emit('siguienteTicket', siguiente);
      callback(siguiente);

    });

});
