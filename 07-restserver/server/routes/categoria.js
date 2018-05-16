
const express = require ('express');
const { verificaToken, verificaAdminRole } = require('../middlewares/autenticacion');
let app = express();
let Categoria = require('../models/categoria');


app.get('/categoria', (req, res) =>{
  // mostrar todas las categorias
  Categoria.find({})
  .sort('descripcion')
  .populate('usuario', 'nombre email')
  .exec( (err, categorias) =>{

    if( err){
      return res.status(500).json({
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


app.get('/categoria/:id', (req, res) => {
  // mostrar categoria por ID
  let categoriaId = req.params.id

  Categoria.findById(categoriaId, (err, categoriaDB)=> {
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


app.post('/categoria', verificaToken, (req, res)=> {
  // crea categoria y mostrarla
  // la info del usuario que la creo se puede obtener de req.usuario._id
  let body = req.body;
  //console.log(`Parametro body-> ${body}`);
  let categoria = new Categoria({
    descripcion: body.descripcion,
    usuario: req.usuario._id
  });

  categoria.save( (err, categoriaDB) =>{

    if(err){
      return res.status(500).json({
        ok: false,
        err
      });
    }

    if( !categoriaDB ){
      return res.status(404).json({
        ok: false,
        err
      });
    }

    res.status(200).json({
      ok: true,
      categoriaDB
    });

  });

});


app.put('/categoria/:id', verificaToken, (req, res) =>{
  let categoriaId = req.params.id
  let body = req.body;

  Categoria.findByIdAndUpdate(categoriaId, body, {new: true}, (err, catgoriaDB) =>{
    if( err){
      return res.status(500).json({
        ok:false,
        err
      });
    }

    res.status(200).json({
      ok: true,
      categoria:catgoriaDB
    });

  });
});


app.delete('/categoria/:id', [verificaToken, verificaAdminRole], (req, res) =>{

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
