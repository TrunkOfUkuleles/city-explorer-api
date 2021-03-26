'use strict';

const superagent = require('superagent');



function movieSer(req, res) {
    const { lattude, lontude } = req.query;
    const url = process.env.MOVIE_BASE
        key: process.env.MOVIE_KEY,
        
    }

    superagent
    .get(url)
    .query(quer)
    .then(SA => {
        
    }).catch(err => {
        res.status(500).send('messed up');
    }); 
    };

module.exports = movieSer;
