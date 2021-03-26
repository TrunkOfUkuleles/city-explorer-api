'use strict';
function Forecast(date, description, temperature) {
    let nwe = new Object;
    nwe.date = date;
    nwe.desc = description;
    nwe.temp = temperature;
    return nwe;
}
