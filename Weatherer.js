'use strict';



function Weatherer (obj) {
    let day = new Object
    day.description = `${obj.high_temp} || 'no temp avail' with ${obj.weather.description.toLowercase()}`;
    day.date = obj.valid_date;
    return day;
}


module.exports = Weatherer;