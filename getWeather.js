      
'use strict';

let cache = require('./cache.js');
const superagent = require('superagent');

function getWeather(req, res) {
  const { lattude, lontude } = req.query;
  const key = 'weather - ' + lattude + lontude;
  const url = `https://api.weatherbit.io/v2.0/forecast/daily/`;
  const queryParams = {
    key: process.env.WEATHER_API_KEY,
    lang: 'en',
    lat: req.query.lat,
    lon: req.query.lon,
    days: 5,
  };
  console.log(queryParams)
  if (cache[key] && (Date.now() - cache[key].timestamp < 50000)) {
    console.log('Cache hit');
    res.send(cache[key].data)
  } else {
    console.log('Cache miss');
    cache[key] = {};
    cache[key].timestamp = Date.now();
    cache[key].data = superagent.get(url)
    .query(queryParams)
    .then(response => {
        const returner = response.body.data
        parseWeather(returner)});
  }
  
  return cache[key].data;
}

function parseWeather(weatherData) {
  try {
    const weatherSummaries = weatherData.map(day => {
      return new Weather(day);
    });
    return Promise.resolve(weatherSummaries);
  } catch (e) {
    return Promise.reject(e);
  }
}

class Weather {
  constructor(day) {
    this.forecast = day.weather.description;
    this.time = day.datetime;
  }
}
module.exports = getWeather;
