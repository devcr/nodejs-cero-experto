let empleados = [{
  nombre: 'Carlos',
  id: 1
},{
  nombre: 'Juan',
  id: 2
},{
  nombre: 'Enrrique',
  id: 3
}]

let salarios = [{
    id: 1,
    salario: 1000
  }, {
    id: 2,
    salario: 2000
  }, {
    id: 3,
    salario: 3350
  }
];

let getSalario = (empleado, callback) => {
   let salarioDB = salarios.find (salario => salario.id === empleado.id);

   if( !salarioDB ){
       callback (`No se encontro salario con id ${empleado.nombre}`);
   }
   //--el null indica que no se regresa error
   callback(null, {
       'nombre': empleado.nombre,
       'salario': salarioDB.salario
   })
}

let getEmpleado = (id, callback) => {

  let empleadoDB = empleados.find (empleado => empleado.id === id);

  if( !empleadoDB ){
    callback (`No exite empleado con id ${id}`)
  }else{
    callback(null, empleadoDB);
  }

}

getEmpleado(3, (err, empleado) => {

  if(err){
    return console.log(`Hubo error: ${err}`);
  }
  //console.log(empleado);

  //-- llamo funcion para obtener salario
  getSalario (empleado, (err, result) => {
      if(err){
          return console.log(`Error ${err}`);
      }
      console.log(result)
  })
});
