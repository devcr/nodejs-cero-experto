
const axios = require('axios');

const getLugar = async(direccion) =>{
  let encodeUrl = encodeURI(direccion);

  let resp = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeUrl}&key=AIzaSyDqfgJYa0ltXzG_wBz3Kn676DbABEPJw08`)

   if(resp.data.status === 'ZERO_RESULTS'){
     throw new Error('Error, no results')
   }

   let location = resp.data.results[0];
   let coors = location.geometry.location;

    //console.log(JSON.stringify(result.data, undefined, 2));
    // console.log('Direccion: ', location);
    // console.log('Lat: ', coors.lat);
    // console.log('Lng: ', coors.lng);

  return{
    'direccion': location.formatted_address,
    'lat': coors.lat,
    'lng': coors.lng
  }

}

module.exports = {
  getLugar
}
