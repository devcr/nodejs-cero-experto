const express = require('express');
const bcrypt = require('bcrypt');

// La libreria underscore ayuda a definir que campos no actualizar en el update
// ver http://underscorejs.org/
const _ = require('underscore');

const Usuario = require('../models/usuario');
const app = express();

app.get('/usuario', function (req, res) {

  // valor de variable para indicar desde que registro tomar
  let desde = req.query.desde || 0;
  desde = Number(desde);

  let limite = req.query.limite || 5;
  limite = Number(limite);

  Usuario.find({}, 'nombre email')
  .skip(desde)
  .limit(limite)
  .exec( (err, usuarios) =>{

    if( err){
      return res.status(400).json({
        ok:false,
        err
      });
    }

    Usuario.count({}, (err, conteo) =>{
      res.json({
        ok: true,
        conteo,
        usuarios
      });
    })

  })

  //res.json('get Usuario')
});

app.post('/usuario', function (req, res) {

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

app.put('/usuario/:id', function (req, res) {
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

app.delete('/usuario/:id', function(req, res){

  let id = req.params.id;
  Usuario.findByIdAndRemove(id, (err, usuarioBorrado) =>{

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
      usuario: usuarioBorrado
    });

  })

});

module.exports = app;
