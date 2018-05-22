
const fs = require('fs');


// clase para ticket pendientes
class Ticket{

  constructor(numero, escritorio){
    this.numero = numero;
    this.escritorio = escritorio;
  }

}

class TicketControl{

  constructor(){
    console.log('CONSTRUCTOR ON ..');

    this.ultimo = 0;
    this.hoy = new Date().getDate();
    this.tickets = [];  // arreglo para tickets pendientes
    this.ultimos4 = [];

    console.log(`TicketControl.constructor() fecha-> ${this.hoy}`);

    let data = require('../data/data.json');

    //console.log(data);

    if ( data.hoy === this.hoy){
      this.ultimo = data.ultimo;
      this.tickets = data.tickets;
      this.ultimos4 = data.ultimos4;
    }else{
      this.reiniciarConteo();
    }

  }

  siguiente(){

    this.ultimo += 1;
    //console.log(`siguiente()_ ultimo-> ${this.ultimo}`);
    let ticket = new Ticket(this.ultimo, null);
    this.tickets.push(ticket);

    this.grabarArchivo();

    return `Ticket ${this.ultimo}`;

  }


  getUltimoticket(){
    return `Ticket ${this.ultimo}`;
  }


  getUltimos4(){
    return this.ultimos4;
  }


  atenderTicket(escritorio){

    if( this.tickets.length === 0 ){
      return 'No hay tickets que atender';
    }

    // tomo y elimino el primer elemento del arreglo
    let numeroTicket = this.tickets[0].numero;
    this.tickets.shift(); // elimina el primero

    let atenderTicket = new Ticket(numeroTicket, escritorio);
    //unshift mueve a la primera posicion un dato
    this.ultimos4.unshift( atenderTicket );

    // borro el ultimo elemento si el size del arrglo es mayor a 4
    // porque solo debe haber 4 elementos en este arreglo
    if( this.ultimos4.length > 4 ){
      this.ultimos4.splice(-1,1); // borra el ultimo
    }

    this.grabarArchivo();

    return atenderTicket;

  }


  reiniciarConteo(){
    this.ultimo = 0;
    this.tickets = [];
    this.ultimos4 = [];

    console.log('Se ha inicializado el sistema');
    this.grabarArchivo();
  }


  grabarArchivo(){

    let jsonData = {
      ultimo: this.ultimo,
      hoy: this.hoy,
      tickets: this.tickets,
      ultimos4:this.ultimos4
    };

    let jsonDataString = JSON.stringify(jsonData);

    fs.writeFileSync('./server/data/data.json', jsonDataString);

    //console.log('Se ha inicializado el sistema');

  }

}


module.exports = {
  TicketControl
}
