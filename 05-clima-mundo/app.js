
const lugar = require('./lugar/lugar')

const argv = require('yargs').options({
  direccion:{
    alias:'d',
    desc: 'Direccion de la ciudad para obtener el clima',
    demand: true
  }
}).argv;

console.log(argv.direccion);


lugar.getLugar (argv.direccion)
  .then( result => {console.log( result )})
  .catch( err => { console.log(err)})
