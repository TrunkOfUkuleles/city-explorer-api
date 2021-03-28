      
'use strict';
require('dotenv').config();

const cache = require('./cache.js');
const superagent = require('superagent');

function getMovie (moviequery) {
  const key = 'Movie - ' + moviequery;
  const query = moviequery    
  const url = `https://api.themoviedb.org/3/search/movie`;
  const queryParams = {
    api_key: process.env.MOVIE_KEY,
    query: query,
  };

  if (cache[key] && (Date.now() - cache[key].timestamp < 50000)) {
    console.log('Cache hit');
    return cache[key].data;
  } else {
    console.log('Cache miss');
    cache[key] = {};
    cache[key].timestamp = Date.now();
    cache[key].data = superagent.get(url)
    .query(queryParams)
    .then(response => {
        const returner = response.body.results
        console.log('returner ', returner)
        parseMovie(returner)})
  }
  console.log('final cache: ', cache[key])
  
  return cache[key].data;
}

function parseMovie(movieReturn) {
  try {
    const movieResults = movieReturn.map(movie => {
      return new Movier(movie);
    });
    return new Promise(movieResults);
  } catch (e) {
    return Promise.reject(e);
  }
}

class Movier {
  constructor(movie) {
    this.title= movie.original_title,
    this.votes= movie.vote_average,
    this.createdAt = new Date();
  }
}
module.exports = getMovie;
