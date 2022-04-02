import './style.css';
import {getCurrentWeather, getWeather} from './APIcalls';

let location = 'Toronto';

getWeather(location);

function locationSubmit () {
    const form = document.querySelector('form');
    const input = document.querySelector('.location-input')
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        location = input.value;
        getCurrentWeather(input.value);
    });
}

locationSubmit();

export {location};