
const config = require('./config/config');

const mongoose = require('mongoose');
const path = require('path');
const bodyParser = require('body-parser');

const express = require('express');
const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json());

// Habilita tarjeta publi del html
app.use( express.static(  path.resolve( __dirname , '../public')));

console.log( path.resolve( __dirname , '../public'));

//-- cnfiguracion global de rutas
app.use(require('./routes/index'));
// app.use( require('./routes/login'));

mongoose.connect(process.env.URLDB, (err, resp) =>{

  if( err ) throw err;

  console.log('Base de datos ONLINE');

});

app.listen(process.env.PORT, () =>{
  console.log(`Server levantado en puerto ${process.env.PORT}`);
})
