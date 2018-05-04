
const hbs = require('hbs');

// helpers
hbs.registerHelper('getAnio', ()=>{
  return new Date().getFullYear();
})
