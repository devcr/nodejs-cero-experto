

const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const hbs = require('hbs');

require ('./hbs/helpers');

app.use( express.static( __dirname + '/public'));

// Express HBS engine
hbs.registerPartials(__dirname + '/views/parciales');
app.set('view engine', 'hbs');



app.get('/', function (req, res) {

  res.render('home', {
    name: 'Devcr'
  });

});

app.get('/about', function (req, res) {

  res.render('parciales/about');

});

app.listen(port, () =>{
  console.log(`Escuchando puerto ${port}`);
} );
