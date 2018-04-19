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
  }
];


let getSalario = (empleado) => {
    return new Promise( (resolve, reject ) => {

      let salarioDB = salarios.find ( salario => salario.id === empleado.id );

      if( !salarioDB ){
        reject(`No exite salario para empleado con id ${empleado.id}`);
      }else{
        resolve({
          nombre: empleado.nombre,
          salario: salarioDB.salario,
          id: empleado.id
         });
      }

    });
}



let getEmpleado = (id) => {

 return new Promise((resolve , reject) => {

   let empleadoDB = empleados.find (empleado => empleado.id === id);

   if( !empleadoDB ){
     reject(`No existe empledo con id ${id}`);
   }else{
     resolve(empleadoDB);
   }

 });

}

/*
getEmpleado(4).then( empleado => {

  getSalario(empleado).then (salario => {

    console.log(`El salario de ${empleado.nombre} es de ${salario.salario}`);
  }, error => console.log(error) );

}, error => console.log(error) );
*/

// -- hace lo mismo que la funcion anterior, pero manera mas facil los errores
// en un catch
getEmpleado(1).then( empleado => {

  return getSalario( empleado );

})
.then(resp => {
  console.log(`El salario de ${resp.nombre} es de ${resp.salario}`);
})
.catch ( err => {
  console.log(err);
});
