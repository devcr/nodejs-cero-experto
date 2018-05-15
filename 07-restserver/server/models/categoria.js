const mongoose = require('mongoose');

let Schema = mongoose.Schema;

let categoriaSchema = new Schema({
  nombre:{
    type: String,
    required: [true, 'Nombre de categoria es requerido']
  }
});


module.exports = mongoose.model('Categoria', categoriaSchema);
