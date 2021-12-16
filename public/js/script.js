'use strict';

console.log('client side js file is loaded');

/**
 * for overly complicated usage of readable stream see
 * https://developer.mozilla.org/en-US/docs/Web/API/Streams_API/Using_readable_streams
 * 
 * for simple usage of readable stream see
 * https://stackoverflow.com/questions/40385133/retrieve-data-from-a-readablestream-object
 */


const locationForm = document.querySelector('form');
const locationInput = document.querySelector('input');
const fieldTop = document.querySelector('#field-top');
const fieldBottom = document.querySelector('#field-bottom');

locationForm.addEventListener('submit', (e) => {
    e.preventDefault();// prevents browser from refreshing after form submit
    const location = locationInput.value;
    getWeather(location);
});

function getWeather(location) {

    fieldTop.textContent = 'loading data';
    fieldBottom.textContent = '';

    fetch(`http://localhost:3000/weather?address=${location}`)
        .then(res => {
            res.json().then(data => {
                if (data.error) {
                    fieldTop.textContent = 'error';
                    fieldBottom.textContent = data.error;
                } else {
                    fieldTop.textContent = data.location;
                    fieldBottom.textContent = data.weather;
                }
            });
        })
        .catch(err => {
            fieldTop.textContent = 'error';
            fieldBottom.textContent = err.message;
        });
}