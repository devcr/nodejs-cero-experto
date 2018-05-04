
const http = require('http');

http.createServer((req, res) => {

  res.writeHead(200, { 'Content-Type':'application/json'});

  let salida = {
    nombre:'Carlos Rene',
    edad:41,
    url: req.url
  }
  res.write( JSON.stringify(salida));
  //res.write('corriendo en puerto 8080. asi es');
  res.end();

})
.listen(8080);

console.log('Escuchando el puerto 8080');
