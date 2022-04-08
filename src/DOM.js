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
        maxTemp.classList.add('temp');
        const minTemp = dayDiv.querySelector('.temp-min');
        minTemp.textContent = object[i].tempMin;
        minTemp.classList.add('temp');
        const icon = dayDiv.querySelector('.forecast-icon');
        icon.setAttribute('src', './icons/cloud.svg');    
    }
}

function hourlyDOM (object, group) {
    for(let i = 0 + 8 * group; i < 8 + 8 * group; i++) {
        const hourlyDiv = document.querySelector(`[data-index="${ i - 8 * group }"]`);
        const time = hourlyDiv.querySelector('.weekday');
        const localTime = unixToHours(object[i].time, object[i].offset);
        time.textContent = localTime;
        const temp = hourlyDiv.querySelector('.temp-max');
        temp.textContent = object[i].temp;
        temp.classList.add('temp');
        // Need to blank out min temp space from daily forecast
        const minTemp = hourlyDiv.querySelector('.temp-min');
        minTemp.textContent = "";
        // Remove temperature class to avoid degrees being added to empty text
        minTemp.classList.remove('temp');
        const icon = hourlyDiv.querySelector('.forecast-icon');
        icon.setAttribute('src', './icons/cloud.svg');
    }
}

function addDegrees (units) {
    const currentTemp = document.getElementById('temperature-current');
    currentTemp.classList.add('temp');
    const currentFeels = document.getElementById('feels-like');
    currentFeels.classList.add('temp');
    const temperatures = document.querySelectorAll('.temp');
    temperatures.forEach(temp => {
        //Check to make sure does not have degrees at the end already.
        // This is important for switching the forecast between daily and hourly
        const degreeCheck = temp.textContent.split('');
        if (degreeCheck[degreeCheck.length - 2] !== "°") {
            if (units === 'metric') {
                temp.textContent = temp.textContent + "°C";
            }
            else {temp.textContent = temp.textContent + "°F"}
        }
    }
)
}

function chooseForecastDOM () {
    const parentNode = document.querySelector('.choose-forecast');
    parentNode.textContent = "";
    const dailyNode = document.createElement('button');
    dailyNode.textContent = "Daily";
    dailyNode.setAttribute('id', 'daily');
    const hourlyNode = document.createElement('button');
    hourlyNode.textContent = "Hourly";
    hourlyNode.setAttribute('id', 'hourly');
    parentNode.appendChild(dailyNode);
    parentNode.appendChild(hourlyNode); 
}

function hourlyNavDOM () {
    const forecastNav = document.querySelector('.choose-forecast');
    const hourNav = document.createElement('div');
    hourNav.setAttribute('id', 'hour-nav');
    const hoursLeft = document.createElement('button');
    hoursLeft.textContent = "<";
    hoursLeft.setAttribute('id', 'left-nav');
    hourNav.appendChild(hoursLeft);
    for(let i = 0; i < 3; i++) {
        const hourGroup = document.createElement('button');
        hourGroup.classList.add('change-hours');
        hourGroup.setAttribute('data-group', i);
        if (i === 0) {
            hourGroup.classList.add('active-hours');
        }
        hourNav.appendChild(hourGroup);
    }
    const hoursRight = document.createElement('button');
    hoursRight.textContent = ">";
    hoursRight.setAttribute('id', 'right-nav');
    hourNav.appendChild(hoursRight);
    forecastNav.appendChild(hourNav);
}

function removeHourlyNavDOM () {
    if (document.getElementById('hour-nav')) {
        const forecastNav = document.querySelector('.choose-forecast');
        forecastNav.removeChild(document.getElementById('hour-nav'));
    }
}

export {currentDOM, dailyDOM, hourlyDOM, addDegrees, chooseForecastDOM, hourlyNavDOM, removeHourlyNavDOM};