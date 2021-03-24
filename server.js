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
const forData = require(`/data/weather.JSON`)  

const PORT = process.env.PORT;

app.get('/', function (req, res){
    res.send('hello world')
})                                                     

app.listen(PORT, ()=> console.log(`listening on ${PORT}`))

function forecast (date, desc){
    let nwe = new Object;
    nwe.date = date;
    nwe.description = desc;
    return nwe;
}



app.get('/forcast', function(req, res){

    let final = forData[0].reduce((acc, curr) => {
        let result = [...acc, forecast(curr.datetime, curr.description)]
        return result
    }, [])
    console.log(final)
    res.send(final)
})