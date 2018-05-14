
const jwt = require('jsonwebtoken');

let verificaToken = (req, res, next) =>{

  // se toma valor del header
  // Nota: validar si se esta usando propiedad token o Authorization en el header
  // para el evio del token
  let token = req.get('token');

  jwt.verify( token, process.env.SEED, (err, decoded) =>{

    if(err){
      return res.status(401).json({
        ok:false,
        err
      })
    }

    // Esta linea permite que se tenga la informcaion del usuario
    // Nota: decoded es todo el contenido del payload
    req.usuario = decoded.usuario;

    // el next permite continuar con el flujo del codigo de la funcion con la ruta
    next();

  });

}

let verificaAdminRole = ( req, res, next) =>{

  let usuario = req.usuario;

  if(usuario.rol === 'ADMIN_ROLE' ){
    //console.log('Usuario admimistrador');
    next();
  }else{
    return res.json({
      ok: false,
      err: {
          msg: 'Usuario NO Autorizado'
      }
    });
  }

}


module.exports = {
  verificaToken,
  verificaAdminRole
}
