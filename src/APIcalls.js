import {objectifyCurrentWeather} from './object';
import {currentDOM} from './DOM';

function getCurrentWeather (location) {
    fetch(`http://api.openweathermap.org/data/2.5/weather?q=${ location }&APPID=b55e6cb5acc75418c397aa9d4a22b7db`, {mode:'cors'})
        .then(function(response) {
            return response.json();
        })
        .then(function(response) {
            console.log(response);
            const weather = objectifyCurrentWeather(response);
            currentDOM(weather);
            getGIF(weather.description);
            console.log(weather);
        })
        .catch(err => {
            const error = document.querySelector('.error');
            error.textContent = "Location Not Found";
        })        
};

function getGIF (description) {
    console.log(description);
    fetch(`https://api.giphy.com/v1/gifs/translate?api_key=srHZgCSBxkHaEIUwuEru1bxRG7xoSCX0&s=${ description }`, {mode: 'cors'})
        .then(function(response) {
            return response.json();
        })
        .then(function(response) {
            const gifNode = document.querySelector('#weather-gif');
            console.log(response);
            gifNode.setAttribute('src', response.data.images.fixed_height.url);
        })
        .catch(err => {
            const gifNode = document.querySelector('#weather-gif');
            gifNode.textContent = "Could not retrieve GIF";
        })

}

export {getCurrentWeather};