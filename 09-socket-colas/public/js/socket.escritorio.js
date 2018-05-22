
var socket = io ();

var label = $('small');

// Nota: Esta funcion es muy probable que no funciones en explorador Windows Edge
var searchParams = new URLSearchParams(window.location.search);

// valida si la url recibida contiene el parametro escritorio
if( !searchParams.has('escritorio') ){
  window.location = 'index.html';

  throw new Error('El escritorio es necesario');
}

var escritorio = searchParams.get('escritorio');

console.log(`escritorio-> ${escritorio}`);

$('h1').text('Escritorio ' + escritorio);

$('button').on('click', function(){

  socket.emit('atenderTicket', { escritorio: escritorio }, function( resp ){

    if( !resp.numero ){
      alert(resp);
    }
    label.text(resp.numero);

  });

});
