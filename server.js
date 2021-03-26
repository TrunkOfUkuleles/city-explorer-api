'use strict';


const express = require('express');
const cors = require('cors');
require('dotenv').config();
const app = express();
app.use(cors())
const PORT = process.env.PORT;
const forecaster = require ('./askServ')

//POL
app.get('/', function (req, res){
    res.send('Welcome')
})
app.listen(PORT, ()=> console.log(`listening on ${PORT}`))

app.get('/weather', forecaster);

app.use('*', (req, res) => {
    res.status(404).send('Page not found bro')
})


