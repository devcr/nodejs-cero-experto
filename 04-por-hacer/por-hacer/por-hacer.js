
const fs = require('fs');

let listadoPorHacer = [];

const guardarDB = () =>{

  let data = JSON.stringify(listadoPorHacer);

  fs.writeFile('db/data.json', data, (err) =>{
    if( err ){
      console.log('Error al guardar data en el archivo data.json'.red);
    }
  })

}


const cargarDB = () =>{
  try {
    listadoPorHacer = require('../db/data.json');
  } catch (e) {
    listadoPorHacer = [];
  }

}

const crear = (descripcion) =>{
  cargarDB();

  let porHacer = {
    descripcion,
    completado: false
  }

  listadoPorHacer.push(porHacer);
  guardarDB();
  return porHacer;
}

const getListado = () =>{
  cargarDB();
  return listadoPorHacer;
}

const actualizar = (descripcion, completado) =>{

  cargarDB();
  let index = listadoPorHacer.findIndex (tarea => tarea.descripcion === descripcion)

  console.log(`actualizar()_ Valor de index ${index}`);
  if ( index < 0 ){
    return false;
  }

  listadoPorHacer[index].completado = completado;
  guardarDB();
  return true;

}

const borrar = (descripcion) =>{
  cargarDB();
  let nuevoListado = listadoPorHacer.filter(tarea => tarea.descripcion !== descripcion )

  //-- valido si se elimino
  if ( listadoPorHacer.length ===  nuevoListado.length ){
    return false;
  }else{

  listadoPorHacer = nuevoListado;
  guardarDB();
  return true;
  }
}

module.exports = {
  crear,
  cargarDB,
  getListado,
  actualizar,
  borrar
}
