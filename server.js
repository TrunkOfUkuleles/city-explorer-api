'use strict';


const express = require('express');
const cors = require('cors');
require('dotenv').config();
const app = express();
app.use(cors())
const PORT = process.env.PORT;
const forecaster = require('./getWeather')
const getMovies = require('./getMovie')


//POL
app.get('/', function (req, res){
    console.log('hello')
    res.send('Welcome')
})
app.listen(PORT, ()=> console.log(`listening on ${PORT}`))

//weather rout recieveing laat/lon  
app.get('/weather', forecaster);

app.get('/movie', getMovies);


app.use('*', (req, res) => {
    res.status(404).send('Page not found bro')
})


