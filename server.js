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
  this.summary = locationWeather.summary;
  this.time = locationWeather.time;
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
    // console.log(request.query.data);
    response.send({lat:location.latitude, lng:location.longitude});
  } catch( error ) {
    errorMessage(response);
  }
});

app.get('/weather', (request, response) => {
  try {
    let responseArr = getWeatherData();
    response.send(responseArr);
    console.log(responseArr);
  } catch( error ) {
    errorMessage(response);
  }
});

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));

function errorMessage(response){
  response.status(500).send('Sorry, something went wrong');
}

function getWeatherData(){
  let forcast = [];
  let locationWeather = require('./data/darksky.json');
  locationWeather.daily.data.forEach((element) =>{
    let weather = new WeatherData(element);
    forcast.push({forcast:weather.summary, time:weather.time});
    console.log(forcast);
  });
  return forcast;
}
