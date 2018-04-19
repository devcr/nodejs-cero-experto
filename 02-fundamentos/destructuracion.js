let deadpool = {
  nombre : 'Wade',
  apellido : 'Winston',
  poder : 'Regeneracion',
  getNombre (){
    return `${this.nombre} ${this.apellido} - poder ${this.poder}`
  }

};

//console.log(deadpool.getNombre());

/*
let nombre = deadpool.nombre;
let apellido = deadpool.apellido;
let poder = deadpool.poder;
*/

//-- Esto es lo mismo que las lineas anteriores.
//-- La ventaja esque perite guardar en una variable cada propieddad del objeto
let {nombre: name, apellido, poder} = deadpool;

console.log(name, apellido, poder);
