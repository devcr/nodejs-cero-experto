/*setTimeout ( () => {
  console.log('tiempo ejecutado');
}, 3000);
*/

let getUsuarioById = (id, callback) =>{

  let usuario = {
    nombre: 'Carlos Rene',
    id
  };

  if( id === 10 ){
    callback (`El usuario con id ${id} no existe` );
  }else{
    callback( null, usuario);
  }
};


getUsuarioById(15, (err, usuario) =>{
   if(err){
     //return console.log(err);
     return console.log( `Hubo error-> ${err}`);
   }
    console.log( usuario );
});
