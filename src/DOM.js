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

function hourlyDOM (object) {
    for(let i = 0; i < 8; i++) {
        const hourlyDiv = document.querySelector(`[data-index="${ i }"]`);
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

export {currentDOM, dailyDOM, hourlyDOM, addDegrees};