      
'use strict';

let cache = require('./cache.js');

function getWeather(req, res) {
  const { lattude, lontude} = req.query;
  const key = 'weather -' + lattude + lontude;
  const url = process.env.WEATHER_BASE;
  const queryParams = {
    key: process.env.WEATHER_API_KEY,
    lang: 'en',
    lat: lat,
    lon: lon,
    days: 5,
  };

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
        parseWeather(rerturner)});
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
