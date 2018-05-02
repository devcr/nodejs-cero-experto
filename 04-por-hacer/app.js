

const argv = require('./config/yargs').argv;
const color = require('colors');
const porHacer = require ('./por-hacer/por-hacer');

//console.log(argv);

let comando = argv._[0];

console.log(`=========== Parametro ${comando} ==============`);

switch (comando) {
  case 'crear':
    //console.log('Comando crear'.blue);
    let tarea = porHacer.crear(argv.descripcion);
    console.log(tarea);
    break;

    case 'listar':
    console.log('Comando listar'.blue);
    let listado = porHacer.getListado();
    //console.log(listado);
    let cont = 1;
    for( let item of listado ){
      console.log(`${cont}) Descripcion: ${item.descripcion} Completado: ${item.completado}`.blue);
      cont++;
    }
  break;

  case 'actualizar':
    console.log('Comando actualizar'.blue);
    let modificado =  porHacer.actualizar(argv.descripcion, argv.completado)

    if( !modificado ){
      console.log('Error en la actulizacion del registro'.red);
    }
    console.log('Registro modificado con exito');

  break;

  case 'borrar':
    console.log('Comando borrar'.blue);
    let borrado = porHacer.borrar(argv.descripcion);
    console.log(`La tarea fue borrada? ${borrado}`);

  break;

  default:
  console.log('comando no reconocido'.red);

}
