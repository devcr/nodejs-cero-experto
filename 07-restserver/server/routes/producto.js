

const express = require('express');
const { verificaToken, verificaAdminRole } = require('../middlewares/autenticacion');
let app = express();
let Producto = require('../models/producto');
let filter = {disponible:true};


app.get('/producto', (req, res) =>{

  Producto.find(filter)
  .sort('nombre')
  .populate('categoria', 'descripcion')
  .populate('usuario', 'nombre rol')
  .exec((err, productosDB) =>{

    if(err){
      return res.status(500).json({
        ok: false,
        err
      });
    }

    Producto.count(filter, (err, contador) =>{

      if(err){
        return res.status(500).json({ ok: false, err });
      }

      res.status(200).json({ok: true, regs: contador, productos: productosDB});
    });

  });
});


app.get('/producto/:id', (req, res) =>{

  let id = req.params.id;

  Producto.findById( id, (err, productoDB) =>{

    if(err){
      return res.status(500).json({
        ok: false,
        err
      });
    }

    if( !productoDB ){
      return res.status(404).json({
        ok: false,
        err
      });
    }

    res.status(200).json({
      ok: true,
      producto: productoDB
    });

  });

});

app.get('/producto/buscar/:termino', (req, res) =>{

  let termino = req.params.termino;
  // se crea una expresion regular, la i es para que sea insensible
  // a mayusculuas y minusculas
  let regexp = new RegExp( termino, 'i' );

  Producto.find({ nombre: regexp })
  .sort('nombre')
  .populate('categoria', 'descripcion')
  .populate('usuario', 'nombre rol')
  .exec((err, productosDB) =>{

    if(err){
      return res.status(500).json({
        ok: false,
        err
      });
    }

    Producto.count({ nombre: regexp }, (err, contador) =>{

      if(err){
        return res.status(500).json({ ok: false, err });
      }

      res.status(200).json({ok: true, regs: contador, productos: productosDB});
    });

  });

});


app.post('/producto', [verificaToken, verificaAdminRole], (req, res) =>{

  let body = req.body;

  let producto = new Producto();

  producto.nombre = body.nombre;
  producto.precioUni = body.precioUni;
  producto.descripcion = body.descripcion;
  producto.disponible = body.disponible;
  producto.categoria = body.categoria;
  producto.usuario = req.usuario._id;

  producto.save((err, productoDB)=>{

    if(err){
      return res.status(500).json({ ok: false, err });
    }

    if( !productoDB ){
      return res.status(404).json({
        ok: false,
        err
      });
    }

    res.json({ ok: true, producto: productoDB });
  });

});


app.put('/producto/:id', [verificaToken, verificaAdminRole], (req, res) =>{

  let id = req.params.id;
  let body = req.body;

  Producto.findByIdAndUpdate (id, body, {new: true}, (err, productoDB) =>{

    if(err){
      return res.status(500).json({ ok: false, err });
    }

    if( !productoDB ){
      return res.status(404).json({
        ok: false,
        err
      });
    }

    res.status(200).json({ ok: true, producto: productoDB });

  });

});


app.delete('/producto/:id', [verificaToken, verificaAdminRole], (req, res) =>{

  let id = req.params.id;

  Producto.findById( id, (err, productoDB) =>{

    if(err){
      return res.status(500).json({ ok: false, err });
    }

    if( !productoDB ){
      return res.status(404).json({
        ok: false,
        mensaje: `Producto no encontrado con id: ${id}`,
        err
      });
    }

    // eliminarlo solo logicamente
    productoDB.disponible = false;

    Producto.findByIdAndUpdate(id, productoDB, (err, productoUpd) =>{

      if(err){
        return res.status(500).json({ ok: false, err });
      }

      res.status(200).json({
        ok: true,
        mensaje: 'Producto eliminado logicamente',
        producto: productoUpd
      });

    });

  });

});


module.exports = app;
