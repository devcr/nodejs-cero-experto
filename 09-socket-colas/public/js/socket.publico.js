
var socket = io ();


socket.on('ticketActual', function(data){
  console.log(data);
});
