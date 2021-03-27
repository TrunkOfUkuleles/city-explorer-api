'use strict';


const express = require('express');
const cors = require('cors');
require('dotenv').config();
const app = express();
app.use(cors())
const PORT = process.env.PORT;
const forecaster = require('./getWeather')
const getMovies = require('./getMovie')
let cache = require('./cache.js');

 function handleWeather(req, res) {
    
    const lat = req.query.lat;
    const lon = req.query.lon;
    forecaster(lat, lon)
    .then(stuff => {
        console.log(stuff)
        res.status(200).send(stuff)})
    .catch((error) => {
        console.error(error)
        res.status(500).send("Sorry, something ain't right")
    })
 
 }

//POL
app.get('/', function (req, res){
    console.log('hello')
    res.send('Welcome')
})

app.listen(PORT, ()=> console.log(`listening on ${PORT}`))

//weather rout recieveing laat/lon  
app.get('/weather', handleWeather);

app.get('/movie', getMovies);

app.use('*', (req, res) => {
    res.status(404).send('Page not found bro')
})


