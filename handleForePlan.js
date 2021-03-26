'use strict';
const superagent = require('superagent');




 function handleForePlan(req, res) {
    const WEATHER = process.env.WEATHER_API_KEY;
    const FORECAST = process.env.WEATHER_BASE;
    const { lat, lon } = req.query.params;

    const CHANNEL = `${FORECAST}?lat=${lat}&lon=${lon}&key=${WEATHER}&days=3`;

    superagent.get(CHANNEL)
        .then(rez => {
            const forray = rez.body.data.reduce((acc, curr) => {
                (curr.lat === lat && curr.lon === lon)
                    ? [...acc, curr]
                    : acc;
            }, []);

            return forray;
        });

    console.log('forray: ', forray);
    res.status(200).send(forray);

}

module.exports = handleForPlan;