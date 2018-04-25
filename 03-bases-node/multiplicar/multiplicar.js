
const fs = require ('fs');
const colors = require('colors');

listarTabla = (base, limite) => {
   return new Promise((resolve, reject) =>{
     if( !Number(base) ){
       reject(`Base ${base} no es numero`);
       return;
     }

     if( !Number(limite) ){
       reject(`limite ${limite} no es numero`);
       return;
     }

     let resultado = '';
     for(let i = 1; i<=limite; i++ ){
       resultado += ` ${base} * ${i} = ${i*base}\n`;
     }
     resolve(resultado);
   });
}

crearArchivo = ( base, limite ) => {
    return new Promise(( resolve, reject) => {
      if( !Number(base) ){
        reject(`Parametro base ${base} no es un numero`);
        return;
      }

      if( !Number(limite) ){
        reject(`Parametro limite ${limite} no es un numero`);
        return;
      }

      let data = '';
      for (let i=1; i<=limite; i++ ){
          data += `${base} x ${i} = ${base*i} \n`;
      }

      fs.writeFile(`tablas/tabla-del-${base}.txt`, data, (err) => {
        if (err){
          reject (err);
        }else{
          //-- regresa nombre del archivo creado
          resolve( `tablas/tabla-del-${base}.txt`);
        }
      });
    });
}

module.exports = {
  crearArchivo,
  listarTabla
}
