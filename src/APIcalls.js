import {objectifyWeather} from './object';
import {currentDOM} from './DOM';

function getWeather (location) {
    const cityCoords = fetch(`http://api.openweathermap.org/data/2.5/weather?q=${ location }&APPID=b55e6cb5acc75418c397aa9d4a22b7db`, {mode:'cors'})
        .then(function(response) {
            return response.json();
        })
        .then(function(response) {
            const coordinates = [response.coord.lon, response.coord.lat];
            return coordinates;
        })
        .catch(err => {
            const error = document.querySelector('.error');
            error.textContent = "Location Not Found";        
        
        })
    cityCoords.then(coord => {
        fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${ coord[1] }&lon=${ coord[0] }&appid=b55e6cb5acc75418c397aa9d4a22b7db`, {mode:'cors'})
            .then(function(response) {
                return response.json();
            })
            .then(function(response) {
                const weather = objectifyWeather(response);
                getGIF(weather.current.description)
            })
            .catch(err => {
                const error = document.querySelector('.error');
                error.textContent = "Location Not Found";        
            
            })
    }); 
};

function getCurrentWeather (location) {
    const test = fetch(`http://api.openweathermap.org/data/2.5/weather?q=${ location }&APPID=b55e6cb5acc75418c397aa9d4a22b7db`, {mode:'cors'})
        .then(function(response) {
            return response.json();
        })
        .then(function(response) {
            const weather = objectifyWeather(response);
            currentDOM(weather);
            getGIF(weather.description);
            return response;
        })
        .catch(err => {
            const error = document.querySelector('.error');
            error.textContent = "Location Not Found";
        })       
};

function getGIF (description) {
    fetch(`https://api.giphy.com/v1/gifs/translate?api_key=srHZgCSBxkHaEIUwuEru1bxRG7xoSCX0&s=${ description }`, {mode: 'cors'})
        .then(function(response) {
            return response.json();
        })
        .then(function(response) {
            const gifNode = document.querySelector('#weather-gif');
            gifNode.setAttribute('src', response.data.images.fixed_height.url);
        })
        .catch(err => {
            const gifNode = document.querySelector('#weather-gif');
            gifNode.textContent = "Could not retrieve GIF";
        })
}

export {getCurrentWeather, getWeather};