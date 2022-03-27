import {objectifyCurrentWeather} from './object';

function getCurrentWeather (location) {
    fetch(`http://api.openweathermap.org/data/2.5/weather?q=${ location }&APPID=b55e6cb5acc75418c397aa9d4a22b7db`, {mode:'cors'})
      .then(function(response) {
          return response.json();
      })
      .then(function(response) {
          console.log(response);
          const weather = objectifyCurrentWeather(response);
          console.log(weather);
      })
      .catch(err => {
          const error = document.querySelector('.error');
          error.textContent = "Location Not Found";
      })        
};

export {getCurrentWeather};