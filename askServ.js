

'use strict';

const superagent = require('superagent');
const Weatherer  = require("./Weatherer");


const inMemDB = {}

function askServ (req, res) {
    const { lat, lon } = req.query;
    if (inMemDB['Weather -' + lat + lon]){ res.send(inMemDB['Weather -' + lat + lon])}
    else{
    const url = process.env.WEATHER_BASE;
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
        imMemDB['Weather -' + lattude + lontude] = weath
        res.status(200).send(weath)
    }).catch(error => {
        res.status(500).send('messed up');
    }); }
    };

module.exports = askServ;
