import './style.css';
import {getCurrentWeather} from './APIcalls';

getCurrentWeather ('Toronto');

function locationSubmit () {
    const form = document.querySelector('form');
    const input = document.querySelector('.location-input')
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        getCurrentWeather(input.value);
    });
}

locationSubmit();