'use strict';
const express = require('express');
const path = require('path');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const weather = require('./utils/weather');

const app = express();
const port = process.env.PORT || 3000;

// define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialPath = path.join(__dirname, '../templates/partials');

// setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialPath)

// setup static engine
app.use(express.static(publicDirectoryPath,{
    extensions: ['html', 'htm'],
}));

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Davey',
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About MMMEEE!!!',
        name: 'Davey',
    });
});

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'You Need Help? Look No Further!',
        name: 'Davey',
    });
});

app.get('/weather', (req, res) => {

    const { address } = req.query;

    if (!address) {
        return res.send({
            error: 'Address must be supplied to lookup weather.'
        });
    }

    geocode(address, (error, { latitude, longitude, location } = {}) => {

        if (error) {
            // console.error(error.message);
            return res.send({ error: error.message });
        }

        weather(latitude, longitude, (error, weatherData) => {

            if (error) {
                // console.error(error.message);
                return res.send({ error: error.message });
            }

            res.send({
                weather: weatherData,
                location,
                address
            });
        });

    });
});

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'Search term is required.'
        });
    }
    console.log(req.query);
    res.send({ products: [] });
});

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404 Error: Help Page Not Found',
        name: 'Davey',
    });
});

// required to be final get
app.get('*', (req, res) => {
    res.render('404', {
        title: '404 Error: Page Not Found',
        name: 'Davey',
    });
});

app.listen(port, () => {
    console.log(`server running on ${port}`);
});