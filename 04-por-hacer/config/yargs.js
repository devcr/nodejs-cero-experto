const argv = require('yargs')
.command('crear', 'Comando para crear nuevo registro', {
  descripcion:{
    demand: true,
    alias: 'd',
    desc: 'Descripcion de la tarea por hacer'
  }
})
.command('actualizar', 'Comando para actualizar', {
  descripcion:{
    demand:true,
    alias: 'd',
    desc: 'Descricpion de la tarea por hacer'
  },
  completado:{
    default: true,
    alias: 'c',
    desc: 'Marca como completado o pendiente la tarea'

  }
})
.command('borrar', 'Comando para borrar', {
  descripcion:{
    demand:true,
    alias: 'd',
    desc: 'Descricpion de la tarea por borrar'
  }
})
.help()
.argv;

module.exports = {
  argv
}
