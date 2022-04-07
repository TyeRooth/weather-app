import { format } from "date-fns";
import {dailyDOM, hourlyDOM, addDegrees} from "./DOM";

function forecastSwitch (object, units) {
    const dailyBtn = document.getElementById('daily');
    dailyBtn.addEventListener('click', () => {
        dailyDOM(object.daily);
        addDegrees(units);
        if(!dailyBtn.classList.contains('active')) {
            switchActive();
        }
    });
    const hourlyBtn = document.querySelector('#hourly');
    hourlyBtn.addEventListener('click', () => {
        hourlyDOM(object.hourly);
        addDegrees(units);
        if(!hourlyBtn.classList.contains('active')) {
            switchActive()
        }
    })

    function switchActive () {
        dailyBtn.classList.toggle('active');
        hourlyBtn.classList.toggle('active');
    }
}

function unixToDay (unix) {
    const milliUnix = unix * 1000;
    const dateObject = new Date(milliUnix);
    const weekday = format(dateObject, 'EEEE');
    return weekday; 
}

function unixToHours (unix, offset) {
    const localUnix = unix + Number(offset) + 14400;
    const milliUnix = localUnix * 1000;
    const dateObject = new Date(milliUnix);
    const hour = format(dateObject, 'p');
    return hour;
}

export {forecastSwitch, unixToDay, unixToHours};