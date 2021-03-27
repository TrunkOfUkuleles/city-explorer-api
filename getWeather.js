      
'use strict';
require('dotenv').config();

const cache = require('./cache.js');
const superagent = require('superagent');

function getWeather(lat, lon) {
    console.log('we hit weather')
  const lattitude = lat;
  const longitude = lon;
  const key = 'weather - ' + lat + lon;
  const url = `https://api.weatherbit.io/v2.0/forecast/daily`;
  const queryParams = {
    key: process.env.WEATHER_API_KEY,
    lang: 'en',
    lat: lattitude,
    lon: longitude,
    days: 5,
  };

  if (cache[key] && (Date.now() - cache[key].timestamp < 50000)) {
    console.log('Cache hit');
    console.log({cache: cache[key].data})
    return cache[key].data;
  } else {
    console.log('Cache miss');

    cache[key] = {};
    cache[key].timestamp = Date.now();
    cache[key].data = superagent.get(url)
    .query(queryParams)
    .then(response => {
        const returner = response.body.data
        console.log
        parseWeather(returner)})
  }

  return cache[key].data;
}

function parseWeather(weatherData) {
  try {
    const weatherSummaries = weatherData.map(day => {
      return new Weather(day)
    });
    console.log('weather days: ', weatherSummaries)
    return weatherSummaries;
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
