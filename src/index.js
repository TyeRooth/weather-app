import './style.css';
import {getWeather} from './APIcalls';

let location = 'Toronto';
let units = 'metric';

getWeather(location, units);

function locationSubmit () {
    const form = document.querySelector('form');
    const input = document.querySelector('.location-input')
    input.value="";
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        location = input.value;
        getWeather(input.value, units);
    });
}

function changeUnits () {
    const unitBtn = document.getElementById('units');
    unitBtn.addEventListener('click', () => {
        const currentText = unitBtn.textContent;
        const newUnit = currentText.split(' ')[1];
        unitBtn.textContent = `Display ${units}`;
        units = newUnit;
        getWeather(location, units);
    })
}

locationSubmit();
changeUnits();

export {location};