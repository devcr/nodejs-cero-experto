

var socket = io ();


socket.on('connect', function(){
  console.log('Conectado!!');
});


socket.on('disconnect', function(){
  console.log('Desconectado!!');
});

$('button').on('click',  function(){
  console.log('Se presiono boton');

});
