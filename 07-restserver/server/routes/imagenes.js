

const express = require('express');
const path = require('path');
const fs = require('fs');

const { verificaTokenImg } = require('../middlewares/autenticacion');

let app = express();


app.get('/imagen/:tipo/:img', verificaTokenImg, (req, res)=>{

  let tipo = req.params.tipo;
  let img = req.params.img;

  let tiposValidos = ['productos', 'usuarios'];

  if( tiposValidos.indexOf( tipo ) < 0 ){
      return res.status(400).json({
        ok: false,
        err:{ mensaje: 'Tipos permitidos: '+tiposValidos.join(', ') }
      });
    }

  let pathImagen = path.resolve(__dirname, `../../uploads/${tipo}/${img}`);
  console.log(`pathImagen-> ${pathImagen}`);

  if( fs.existsSync(pathImagen) ){
    res.sendFile(pathImagen);
  }else{
    let pathNoImg = path.resolve(__dirname,  '../assets/no-image.jpg');
    res.sendFile(pathNoImg);
  }




});


module.exports = app;
