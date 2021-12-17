'use strict';
const request = require('request');

const weather = (latitude, longitude, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=9a55d015dce63c5a43db476fc98634ff&query=${latitude},${longitude}&units=f`;

    request({ url, json: true }, (error, { body } = {}) => {
        if (error) {
            callback(new Error('unable to connect to weather service'));
        } else if (body.error) {
            callback(new Error(body.error.info + ' code: ' + body.error.code));
        } else if (!latitude || !longitude) {
            callback(new Error('latitude and/or longitude variables missing/bad'));
        } else {
            callback(null, `${body.current.weather_descriptions[0]}. It is currently ${body.current.temperature} degrees. It feels like ${body.current.feelslike} degrees.`);
        }
    });
}

module.exports = weather;