import { unixToDay, unixToHours } from "./utilities";

function currentDOM (object) {
    addText('location-current', object.location);
    addText('temperature-current', object.temperature);
    addText('description-current', object.description);
    addText('feels-like', object.feelsLike);
    addText('humidity', object.humidity);
    addText('wind-speed', object.windSpeed);
}

function addText (id, property) {
    const node = document.querySelector('#' + id)
    node.textContent = property;
}

function dailyDOM (object) {
    for(let i = 0; i < 8; i++) {
        const dayDiv = document.querySelector(`[data-index="${ i }"]`);
        const weekday = dayDiv.querySelector('.weekday');
        if(i === 0) {
            weekday.textContent = "Today";
        }
        else {
            weekday.textContent = unixToDay(object[i].time);
        }
        const maxTemp = dayDiv.querySelector('.temp-max');
        maxTemp.textContent = object[i].tempMax;
        const minTemp = dayDiv.querySelector('.temp-min');
        minTemp.textContent = object[i].tempMin;
        const icon = dayDiv.querySelector('.forecast-icon');
        icon.setAttribute('src', './icons/cloud.svg');    
    }
}

function hourlyDOM (object) {
    for(let i = 0; i < 8; i++) {
        const hourlyDiv = document.querySelector(`[data-index="${ i }"]`);
        const time = hourlyDiv.querySelector('.weekday');
        const localTime = unixToHours(object[i].time, object[i].offset);
        time.textContent = localTime;
        const temp = hourlyDiv.querySelector('.temp-max');
        temp.textContent = object[i].temp;
        // Need to blank out min temp space from daily forecast
        const minTemp = hourlyDiv.querySelector('.temp-min');
        minTemp.textContent = "";
        const icon = hourlyDiv.querySelector('.forecast-icon');
        icon.setAttribute('src', './icons/cloud.svg');
    }
}

export {currentDOM, dailyDOM, hourlyDOM};