'use strict';

let location;
require('dotenv').config();
const express = require('express');
const app = express();
function LocationData(geoData){
  this.address = geoData.results[0].formatted_address;
  this.latitude = geoData.results[0].geometry.location.lat;
  this.longitude = geoData.results[0].geometry.location.lng;
}

function WeatherData(locationWeather){
  this.forecast = locationWeather.currently.summary;
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
    location = new LocationData(geoData);
    console.log(request.query.data);
    response.send(geoData);
  } catch( error ) {
    console.log('there was an error getting geo data');
    response.status(500).send('sorry, error');
  }
});

app.get('/weather', (request, response) => {
  try {
    let locationWeather = require('./data/darksky.json');
    let weather = new WeatherData(locationWeather);
    console.log({location: {latitude: location.latitude, longitude: location.longitude}});
    response.send({location: {latitude: location.latitude, longitude: location.longitude}});

  } catch( error ) {
    console.log('there was an error getting weather data');
    response.status(500).send('sorry, error');
  }
});

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
