const { io } = require('../server');
const { Usuarios } = require('../classes/usuarios');
const { crearMensaje } = require('../utilidades/utilidades');

const usuarios = new Usuarios();


io.on('connection', (client) => {

  client.on('entrarChat', (data, callback) =>{

    if( !data.nombre ){
     return callback({
       err: true,
       mensaje: 'El nombre es necesario'
     });
    }

    let personas = usuarios.agregarPersona( client.id, data.nombre );

    callback(personas);

    //console.log(usuario);

  });


  // para enviar mensaje a todos
  client.on('crearMensaje', (data) =>{

    let persona = usuarios.getPersona(client.id);

    //NOTA: tambien se pudo tomar el nombre del user asi:  data.nombre
    let mensaje = crearMensaje( persona.nombre, data.mensaje );
    client.broadcast.emit('crearMensaje', mensaje);

  });

  client.on('disconnect', ()=>{
    let borrado = usuarios.borrarPersona(client.id);

    // Notifico a los clinetes que tal usuario abano el entrarChat
    client.broadcast.emit('crearMensaje', crearMensaje('Adminstrador', `${borrado.nombre} abandono el chat`));

    // regresa lista a los clintes la lista de usuarios aun conectados
    client.broadcast.emit('listaPersona', usuarios.getPersonas());

  });

  //mensaje privado
  client.on('mensajePrivado', data =>{

    //NOTA: en este punto validar que llegue el id y el mensaje.
    let persona = usuarios.getPersona(client.id);
    client.broadcast.to(data.para).emit('mensajePrivado', crearMensaje(persona.nombre, data.mensaje));

  });

});
