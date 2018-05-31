const { io } = require('../server');
const { Usuarios } = require('../classes/usuarios');
const { crearMensaje } = require('../utilidades/utilidades');

const usuarios = new Usuarios();


io.on('connection', (client) => {

  client.on('entrarChat', (data, callback) =>{

    if( !data.nombre || !data.sala ){
     return callback({
       err: true,
       mensaje: 'El nombre/sala es necesario'
     });
    }

    // agrego al cliente a una sala de chat
    client.join(data.sala);

    let personas = usuarios.agregarPersona( client.id, data.nombre, data.sala );

    client.broadcast.to(data.sala).emit('listaPersona', usuarios.getPersonasPorSala(data.sala));

    //notifica en la sala que un usuario se unio
    client.broadcast.to(data.sala).emit('crearMensaje', crearMensaje('Administrador', `${data.nombre} se unio`));

    //callback(personas);   30may2018
    callback(usuarios.getPersonasPorSala(data.sala));

  });


  // para enviar mensaje a todos
  client.on('crearMensaje', (data, callback) =>{

    let persona = usuarios.getPersona(client.id);

    //NOTA: tambien se pudo tomar el nombre del user asi:  data.nombre
    let mensaje = crearMensaje( persona.nombre, data.mensaje );
    client.broadcast.to(persona.sala).emit('crearMensaje', mensaje);

    callback(mensaje);

  });

  client.on('disconnect', ()=>{
    let borrado = usuarios.borrarPersona(client.id);

    // Notifico a los clinetes que tal usuario abano el entrarChat
    client.broadcast.to(borrado.sala).emit('crearMensaje', crearMensaje('Administrador', `${borrado.nombre} abandono el chat`));

    // regresa lista a los clientes la lista de usuarios aun conectados
    client.broadcast.to(borrado.sala).emit('listaPersona', usuarios.getPersonasPorSala(borrado.sala));

  });

  //mensaje privado
  client.on('mensajePrivado', data =>{

    //NOTA: en este punto validar que llegue el id y el mensaje.
    let persona = usuarios.getPersona(client.id);
    client.broadcast.to(data.para).emit('mensajePrivado', crearMensaje(persona.nombre, data.mensaje));

  });

});
