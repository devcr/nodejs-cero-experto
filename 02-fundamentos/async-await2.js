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

   let empleadoDB = empleados.find (empleado => empleado.id === id);

   if( !empleadoDB ){
     throw new Error(`No existe un empleado con el ID ${ id }`)
   }else{
     return empleadoDB;
   }
}

/*
async getInformacion(id){

  let empleado = await getEmpleado(id);
  let resp = await getSalario(empledo);

  return `${resp.nombre} tiene un salario de ${resp.salario}`;

}
*/

let getInformacion = async(id) =>  {

   let empleado = await getEmpleado(id);
   let resp = await getSalario(empleado);

   return `${resp.nombre} tiene un salario de ${resp.salario}`;

}



getInformacion (4)
.then( mensaje => console.log(mensaje))
.catch( err => console.log(err));
