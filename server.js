'use strict';

const express = require('express');
//brings in env library

require('dotenv').config();
//library to handle visitors (bodyguard)
const cors = require('cors');
//innit
const app = express();
//others access server
app.use(cors())


const PORT = process.env.PORT;

app.get('/', function (req, res){
    res.send('hello world')
})   

app.get('/test', function (req, res){
    res.send(forData.data.reduce((acc, curr) => {
        let result = [...acc, Forecast(curr.datetime, curr.lat, curr.lon)]
        return result
    }, []))
} )

app.listen(PORT, ()=> console.log(`listening on ${PORT}`))

function Forecast (date, lat, lon){
    let nwe = new Object;
    nwe.date = date;
    nwe.lat = lat;
    nwe.lon = lon
    return nwe;
}
const forData = require('./data/weather.json')  


app.get('/weather', function(req, res){

    let final = forData.data.reduce((acc, curr) => {
        let result = [...acc, Forecast(curr.datetime, curr.weather.description)]
        return result
    }, [])
   
    res.send(final)
})