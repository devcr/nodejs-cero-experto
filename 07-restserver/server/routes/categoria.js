
const express = require ('express');
const Categoria = require('../models/categoria');
const { verficaToken } = require('../middlewares/autenticacion');
const app = express();


app.get('/categoria', (req, res) =>{
  // mostrar todas las categorias
  Categoria.find({})
  .exec( (err, categorias) =>{

    if( err){
      return res.status(400).json({
        ok:false,
        err
      });
    }

    Categoria.count({}, (err, conteo) =>{
      res.json({
        ok: true,
        conteo,
        categorias
      });
    })

  })

});


app.get('/categoria/:id', (req, res) =>{
  // mostrar categoria por ID
  let categoriaId = req.params.id

  Categoria.findById(categoriaId, (err, categoriaDB)=>{
    if(err){
      return res.status(500).json({
        ok:false,
        err
      });
    }

    if(!categoriaDB){
      return res.status(404).json({
        ok:false
      });
    }

    res.status(200).json({
      ok:true,
      categoriaDB
    });

  });

});


app.post('/categoria', (req, res) =>{
  // crea categoria y mostrarla
  // la info del usuario que la creo se puede obtener de req.usuario._id
  let body = req.body;
  //console.log(`Parametro body-> ${body}`);
  let categoria = new Categoria({
    nombre: body.nombre
  });

  categoria.save( (err, categoriaDB) =>{

    if( err ){
      return res.status(400).json({
        ok: false,
        err
      });
    }

    res.json({
      ok: true,
      categoriaDB
    });

  });

});


app.put('/categoria/:id' , (req, res) =>{
  let categoriaId = req.params.id
  let body = req.body;

  Categoria.findByIdAndUpdate(categoriaId, body, {new: true}, (err, catgoriaDB) =>{
    if( err){
      return res.status(400).json({
        ok:false,
        err
      });
    }

    res.status(200).json({
      ok: true,
      catgoriaDB
    });

  });
});


app.delete('/categoria/:id',  (req, res) =>{

  let categoriaId = req.params.id;
  // borrar categoria fisicamente, validar token
  Categoria.findByIdAndRemove(categoriaId, (err, categoriaDB) =>{

    if(err){
      return res.status(500).json({
        ok:false,
        err
      });
    }

    if(!categoriaDB){
      return res.status(404).json({
        ok:false,
        err:{
          mensaje: 'ID invalido'
        }
      });
    }

    res.status(200).json({
      ok:true,
      categoriaDB
    });

  });


});


module.exports = app;
