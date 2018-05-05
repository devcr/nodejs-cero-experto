

const config = require('./config/config');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

//const port = process.env.PORT || 3000;

app.get('/usuario', function (req, res) {
  res.json('get Usuario')
});

app.post('/usuario', function (req, res) {

  let persona = req.body;

  if( persona.nombre === undefined ){
    res.status(400).json({
      result: "Error",
      mensaje: 'Propiedaad nombre requerida'
    })
  }

  res.json(
    persona
  );
});

app.put('/usuario/:id', function (req, res) {
  let id = req.params.id;
  res.json({
    id
  })
});

app.listen(process.env.PORT, () =>{
  console.log(`Server levantado en puerto ${process.env.PORT}`);
})
