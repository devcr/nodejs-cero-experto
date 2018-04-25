
//const multiplicar = require('./multiplicar/multiplicar');
const {crearArchivo} = require('./multiplicar/multiplicar');

const argv = require('./config/yargs').argv;
const colors = require('colors');

//console.log(argv);
let command = argv._[0];

switch (command) {
  case 'listar':
  console.log('Comando listar');
  listarTabla(argv.base, argv.limite)
  .then( resultado => { console.log(resultado.white)})
  .catch( error => {  console.log(error.red) });

    break;

    case 'crear':
    //console.log('Comando crear');
    crearArchivo(argv.base, argv.limite)
    .then ( archivo =>  console.log(`Archivo creado: ${archivo}`.white))
    .catch ( err => console.log(err.red));
      break;

  default:
  console.log('Comando no reconocido');
}


console.log(`Base->${argv.base}`);
console.log(`Limite->${argv.limite}`)
//console.log(process.argv);
