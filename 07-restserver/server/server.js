
// localhost:3000/usuario/123

const config = require('./config/config');

const mongoose = require('mongoose');

const bodyParser = require('body-parser');

const express = require('express');
const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

app.use( require('./routes/usuario'));

mongoose.connect('mongodb://localhost:27017/cafe', (err, resp) =>{

  if( err ) throw err;

  console.log('Base de datos ONLINE');

});

app.listen(process.env.PORT, () =>{
  console.log(`Server levantado en puerto ${process.env.PORT}`);
})
