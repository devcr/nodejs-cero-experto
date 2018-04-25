
const opts = {
  base: {
    demand: true,
    alias: 'b'
  },
  limite:{
    alias: 'l',
    default: 10
  }
}

const argv = require('yargs')
.command('listar', 'Este comando permite listar la tabla con base N',opts)
.command('crear', 'Este comando crea tabla con base N y limite N',opts)
.help()//aunuqe no le ponga esto, muestra la ayuda si el comando no esta correcto
.argv;

module.exports = {
  argv
}
