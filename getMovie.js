      
'use strict';

let cache = require('./cache.js');

function getMovie (req, res) {
  const { name } = req.query;     
  const key = 'Movie - ' + name ;    
  const url = process.env.MOVIE_BASE;
  const queryParams = {
    key: process.env.MOVIE_KEY,
    query: name,
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
        const returner = response.body.data.results
        parseMovies(returner)});
  }
  
  return cache[key].data;
}

function parseMovies(movieReturn) {
  try {
    const movieResults = movieReturn.map(movie => {
      return new Movier(movie);
    });
    return Promise.resolve(movieResults);
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
