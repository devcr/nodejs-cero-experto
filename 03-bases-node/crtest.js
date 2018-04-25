
/**
Borrar este archvi solo es de  mis pruebas
**/

console.log(process.argv);

let param = process.argv[2];

console.log(`Parametro recibido ${param}`);

let getResult = (param) => {

  return new Promise ( ( resolve, reject ) => {

     if( !Number(param) ){
       reject(`Error, ${param} no es un numero`);
     }else{
       resolve('Ejcutado con exito');
     }
  });

}


getResult(param)
.then( result => {  console.log(result)})
.catch ( err => { console.log(err) } )
