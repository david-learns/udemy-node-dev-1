'use strict';
const request = require('request')

const geocode = (address, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoiZGF2aS10aGUtZGV2aSIsImEiOiJja3dqdTY5aWcxbTVrMnZvemdnZmM4anJtIn0.rERLDceSkppdAGuZJRD-Pw&limit=1`

    request({ url, json: true }, (error, { body } = {}) => {
        if (error) {
            callback(new Error('unable to connect to geocode'));
        } else if (body.features.length === 0) {
            callback(new Error('geocode: no location data returned. check location and try again.'));
        } else {
            callback(null, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    });
}

module.exports = geocode;