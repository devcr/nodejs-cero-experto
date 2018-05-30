

class Usuarios{

  constructor(){
      this.personas = [];
  }


  agregarPersona(id, nombre, sala){

    let persona = { id, nombre, sala }
    this.personas.push(persona);

    return this. personas;
  }


  getPersona(id){

    // se toma posicion cero porque el filter regresa un arreglo
    let persona = this.personas.filter( persona => persona.id === id)[0];

    return persona;
  }


  getPersonas(){
    return this.personas;
  }


  getPersonasPorSala(sala){

    let personasEnSala = this.personas.filter( persona => persona.sala === sala );
    return personasEnSala;
    
  }


  borrarPersona(id){

    let personaBorrada = this.getPersona(id);

    // regresa arreglo de todas las personas,  menos la que coincidan con el id
    //(reemplaza los elemento en el arreglo)
    this.personas = this.personas.filter( persona => persona.id !== id );

    return personaBorrada;

  }

}


module.exports = {
  Usuarios
}
