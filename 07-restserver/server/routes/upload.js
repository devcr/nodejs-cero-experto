
const express = require('express');
const fileUpload = require('express-fileupload');
const app = express();
const path = require('path');
const fs = require('fs');

const Usuario = require('../models/usuario');

// default options  (uso del middleware)
app.use(fileUpload());


app.put('/upload/:tipo/:id', (req, res) => {

  let tipo = req.params.tipo;
  let id = req.params.id;

  let tiposValidos = ['productos', 'usuarios'];

  if (!req.files){
    return res.status(400).josn({
      ok: false,
      err:{ mensaje: 'No se ha seleccionado archivo' }
    });
  }

  if( tiposValidos.indexOf( tipo ) < 0 ){
    return res.status(400).json({
      ok: false,
      err:{ mensaje: 'Tipos permitidos: '+tiposValidos.join(', ') }
    });
  }

  let archivo = req.files.archivo;
  // extensiones permitidas
  let extensionesValidas = ['jpg', 'jpeg', 'gif', 'png', 'bmp'];
  let nombreCortado = archivo.name.split('.');
  let extension = nombreCortado[nombreCortado.length -1];

  if( extensionesValidas.indexOf( extension ) < 0 ){
    return res.status(400).json({
      ok: false,
      err:{ mensaje: 'Tipo de archivo permitidos '+extensionesValidas.join(', ') }
    });
  }

  // cambiar nombre del Archivo  (le cocatenamos los getMilliseconds para asegurar no repetir nombre)
  let nombreArchivo = `${id}-${ new Date().getMilliseconds() }.${extension}`;

  archivo.mv(`uploads/${ tipo }/${ nombreArchivo }`, (err) =>{
    if (err){
      return res.status(500).json({
        ok: false,
        err
      });
    }

    if( tipo === 'usuarios' ){
      imagenUsuario(id, res, nombreArchivo, tipo);
    }

  });

});

function imagenUsuario(id, res, nombreArchivo, tipo){

  Usuario.findById( id, (err, usuarioDB)=>{

    if (err){
      borrarArchivo(nombreArchivo, tipo);
      return res.status(500).json({
        ok: false,
        err
      });
    }

    if (!usuarioDB){
      borrarArchivo(nombreArchivo, tipo);
      return res.status(404).json({
        ok: false,
        err:{
          mensaje: `usuarioDB ${id}`
        }
      });
    }

    borrarArchivo(usuarioDB.img, tipo);

    usuarioDB.img = nombreArchivo;

    usuarioDB.save((err, usuarioUpd)=>{
      res.json({
        ok: true,
        img: nombreArchivo,
        usuario: usuarioUpd
      });
    });

  });

}


function borrarArchivo( nombreArchivo, tipo ){

  let pathImagen = path.resolve(__dirname, `../../uploads/${tipo}/${nombreArchivo}`);
  // se utiliza metodos sync (suncronos)  para no manejar callbacks
  if ( fs.existsSync(pathImagen) ){
    fs.unlinkSync(pathImagen);
  }

}

module.exports = app;
