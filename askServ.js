

'use strict';

const superagent = require('superagent');
const Weatherer  = require("./Weatherer");


function askServ (req, res) {
    const { lattude, lontude } = req.query;
    const url = process.env.BASE;
    const quer = {
        key: process.env.WEATHER_API_KEY,
        lat: lattude,
        lon: lontude,
    }

    superagent
    .get(url)
    .query(quer)
    .then(SA => {
        const resul = SA.body.data;
        const weath = resul.map(day => new Weatherer(day));
        res.status(200).send(weath)
    }).catch(err => {
        res.status(500).send('messed up');
    }); 
    };

module.exports = askServ;
