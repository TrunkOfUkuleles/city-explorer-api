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

const forData = require('./data/weather.json').data.reduce((acc, curr) => {
    return  [...acc, Forecast(curr.datetime, curr.weather.description, curr.temp)]
                                           
}, [])


const PORT = process.env.PORT;
const WEATHER = process.env.WEATHER_API_KEY;

app.get('/', function (req, res){
    res.send('Welcome')
})   

// app.get('/test', function (req, res){
//     res.send(forData.data.reduce((acc, curr) => {
//         let result = [...acc, Forecast(curr.datetime, curr.lat, curr.lon)]
//         return result
//     }, []))
// } )

app.listen(PORT, ()=> console.log(`listening on ${PORT}`))

function Forecast (date, description, temperature){
    let nwe = new Object;
    nwe.date = date;
    nwe.desc = description;
    nwe.temp = temperature
    return nwe;
}



app.get('/weather', async function(req, res){
    {console.log(forData)}
   const final = forData

    res.send(final)
})

app.use('*', (req, res) => {
    res.status(404).send('Page not found bro')
})