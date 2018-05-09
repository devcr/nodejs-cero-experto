
// PUERTO
process.env.PORT = process.env.PORT || 3000;

// Caducidad jsonwebtoken
process.env.CADUCIDAD_TOKEN = 60 * 60 * 24 * 30;

// SEED DE AUTNETICACION
process.env.SEED = process.env.SEED || 'este-es-el-seed-desarrollo';
