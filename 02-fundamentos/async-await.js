/**
* Async Await
**/

/*
let getNombre = async => {
  return 'Carlos rene ss';
};*/


let getNombre = () =>  {

  return new Promise ( (resolve, reject) => {

    setTimeout( () => {
       resolve('Carlos Rene Soto Sanchez');
    }, 3000 );

  });
}


getNombre().then (  nombre => {
  console.log(nombre);
})
.catch( err => {
  console.log(err);
});
