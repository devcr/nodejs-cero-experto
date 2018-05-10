
// PUERTO
process.env.PORT = process.env.PORT || 3000;

// Caducidad jsonwebtoken
process.env.CADUCIDAD_TOKEN = 60 * 60 * 24 * 30;

// SEED DE AUTNETICACION
process.env.SEED = process.env.SEED || 'este-es-el-seed-desarrollo';

// GOOGLE CLIENT ID
process.env.CLIENT_ID = process.env.CLIENT_ID || '681312483065-lp2ckk1v5u9jciivo6ciil1pvdk958fd.apps.googleusercontent.com'
