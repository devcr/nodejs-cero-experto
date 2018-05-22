
var socket = io ();
var label = $('#lblNuevoTicket');

socket.on('connect', function(){
  console.log('Conectado!!');
});


socket.on('disconnect', function(){
  console.log('Desconectado!!');
});


$('button').on('click', function(ticket){

  // envia mensaje al server para generar siguiente ticket
  socket.emit('siguienteTicket', null, (ticket)=>{
    //document.getElementById("lblNuevoTicket").innerHTML = data;
    label.text(ticket);
  });

});

//-- Muestra valor de ticket actual cargar pantalla
socket.on('ticketActual',  function (data) {
  label.text(data.actual);
});
