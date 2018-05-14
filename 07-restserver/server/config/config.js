
// PUERTO
process.env.PORT = process.env.PORT || 3000;

//ENTORNO
process.env.NODE_ENV = process.env.NODE_ENV || 'env';

//BD
let urlDB;

if(process.env.NODE_ENV === 'env'){
  urlDB = 'mongodb://localhost:27017/cafe';
}else{
  urlDB = 'mongodb://dev:admindb76@ds117590.mlab.com:17590/cafe';
}

// amaro url para apiuntar directo a prod (solo para probar)
//urlDB = 'mongodb://dev:admindb76@ds117590.mlab.com:17590/cafe';
console.log(`urlDB--> ${urlDB}`);
process.env.URLDB = urlDB;

// Caducidad jsonwebtoken
process.env.CADUCIDAD_TOKEN = 60 * 60 * 24 * 30;

// SEED DE AUTNETICACION
process.env.SEED = process.env.SEED || 'este-es-el-seed-desarrollo';

// GOOGLE CLIENT ID
process.env.CLIENT_ID = process.env.CLIENT_ID || '681312483065-lp2ckk1v5u9jciivo6ciil1pvdk958fd.apps.googleusercontent.com'
