'use strict';

require('dotenv').config();
const express = require('express');
const app = express(); 
function LocationData(geoData){
  this.address = geoData.results[0].formatted_address;
  this.latitude = geoData.results[0].geometry.location.lat;
  this.longitude = geoData.results[0].geometry.location.lng;

}
// use environment variable, or, if it's undefined, use 3000 by default
const PORT = process.env.PORT || 3000;


app.use(express.static('./public'));

app.get('/isitworking', (request, response) => {
  response.send('yes');
});

app.get('/location', (request, response) => {
  try {
    let geoData = require('./data/geo.json');
    let location = new LocationData(geoData);
    console.log('location :' ,location);
    response.send(geoData);
  } catch( error ) {
    console.log('there was an error');
    response.status(500).send('sorry, error');
  }

});

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));