
const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

let rolesValidos = {
  values : ['ADMIN_ROLE', 'USER_ROLE'],
  message: '{VALUE} No es un rol valido'
};

let Schema = mongoose.Schema;

let usuarioSchema = new Schema({

  nombre:{
    type: String,
    required: [true, 'El nombre es requerido']
  },
  email: {
    type: String,
    unique: true,
    required: [true, 'El correo es requerido']
  },

  password:{
    type: String,
    required: [true, 'El password es requerido']
  },
  img:{
    type: String,
    required: false
  }, // No obligatoria
  rol:{
    type: String,
    default: 'USER_ROLE',
    enum : rolesValidos
  }, // default 'USER_ROLE'
  estado:{
    type: Boolean,
    default: true
  },// boolean
  google:{
    type: Boolean,
    default: false
  } // boolean

});

//-- Es funcion ayuda a definir que no se pinte la propiedad password cuando se
// pinte o regrese el json del usuario (util en funcion Post alta de usuario )
usuarioSchema.methods.toJSON = function () {

  let user = this;
  let userObject = user.toObject();
  delete userObject.password;

  return userObject;
}

usuarioSchema.plugin(uniqueValidator, {message: '{PATH} debe de ser unico'});

module.exports = mongoose.model('Usuario', usuarioSchema);
