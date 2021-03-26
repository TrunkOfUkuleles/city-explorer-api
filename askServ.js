

'use strict';

const superagent = require('superagent');
const Weatherer  = require("./Weatherer");


function askServ (req, res) {
    const { lat, lon } = req.query;
    const url = process.env.BASE;
    const query = {
        key: process.env.WEATHER_API_KEY,
        lat: lat,
        lon: lon,
    }
        console.log(query)
    superagent
    .get(url)
    .query(query)
    .then(SA => {
        const result = SA.body.data;
        const weath = result.map(day => new Weatherer(day));
        res.status(200).send(weath)
    }).catch(err => {
        res.status(500).send('messed up');
    }); 
    };

module.exports = askServ;
