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

    //-- envio valor de ticket actual al cliente (al cagar la pantalla)
    client.emit('ticketActual', {
      actual: ticketControl.getUltimoticket(),
      ultimos4: ticketControl.getUltimos4()
    });


    client.on('atenderTicket', (data, callback) =>{

      if( !data.escritorio ){
        return callback({
          err : true,
          mensaje: 'El escritorio es necesario'
        });
      }

      let atenderTicket = ticketControl.atenderTicket( data.escritorio );

      callback(atenderTicket);

      // actulizar notificar cambios en los ultios 4
      cliet.broadcast.emit('ultimos4', {
        ultimos4: ticketControl.getUltimos4()
      });

    });

});
