const express = require('express');
const bcrypt = require('bcrypt');

// La libreria underscore ayuda a definir que campos no actualizar en el update
// ver http://underscorejs.org/
const _ = require('underscore');
const Usuario = require('../models/usuario');
const { verificaToken, verificaAdminRole } = require('../middlewares/autenticacion');
const app = express();


app.get('/usuario',  (req, res) => {
  // valor de variable para indicar desde que registro tomar
  let desde = req.query.desde || 0;
  desde = Number(desde);

  let limite = req.query.limite || 5;
  limite = Number(limite);

  let filter = {estado: true};

  Usuario.find(filter, 'nombre email')
  .skip(desde)
  .limit(limite)
  .exec( (err, usuarios) =>{

    if( err){
      return res.status(400).json({
        ok:false,
        err
      });
    }

    Usuario.count(filter, (err, conteo) =>{
      res.json({
        ok: true,
        conteo,
        usuarios
      });
    })

  })

  //res.json('get Usuario')
});


app.post('/usuario', [verificaToken, verificaAdminRole], (req, res) => {

  let body = req.body;

  let usuario = new Usuario ({
    nombre: body.nombre,
    email: body.email,
    password: bcrypt.hashSync(body.password, 10),
    rol: body.rol,
  });

  usuario.save( (err, usuarioDB)=> {

    if( err){
      return res.status(400).json({
        ok:false,
        err
      });
    }

    res.json({
      ok: true,
      usuarioDB
    });

  });
});

app.put('/usuario/:id', [verificaToken, verificaAdminRole], (req, res) => {
  let id = req.params.id;

  //-- con esta linea se indica que campos pueden ser modificados
  let body = _.pick(req.body, ['nombre', 'email', 'img', 'rol', 'estado']);

  Usuario.findByIdAndUpdate(id, body, { new: true, runValidators: true }, (err, usuarioDB) =>{

    if( err){
      return res.status(400).json({
        ok:false,
        err
      });
    }

    res.json({
      ok: true,
      usuarioDB
    });

  })
});


//Nota: con este metodo damos de baja logicamente al usuario
//poniendo el false la bandera
app.delete('/usuario/:id', [verificaToken, verificaAdminRole], (req, res) => {

  let id = req.params.id;

  let newEstado = {
    estado: false
  }

  Usuario.findByIdAndUpdate(id, newEstado, { new: true, runValidators: true }, (err, usuarioBorrado) =>{
  //Usuario.findByIdAndRemove(id, (err, usuarioBorrado) =>{

    if( err){
      return res.status(400).json({
        ok:false,
        err
      });
    }

    if(!usuarioBorrado){
      return res.status(400).json({
        ok:false,
        err:{
          mensaje: 'Usuario no existe'
        }
      });
    }

    res.json({
      ok: true,
      msg:'Usuario borrado logicamente',
      usuario: usuarioBorrado
    });

  })

});

module.exports = app;
