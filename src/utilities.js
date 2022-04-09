import { format } from "date-fns";
import {dailyDOM, hourlyDOM, addDegrees, hourlyNavDOM, removeHourlyNavDOM} from "./DOM";

function forecastSwitch (object, units) {
    const dailyBtn = document.getElementById('daily');
    dailyBtn.addEventListener('click', () => {
        dailyDOM(object.daily);
        addDegrees(units);
        if(!dailyBtn.classList.contains('active')) {
            switchActive();
        }
        removeHourlyNavDOM();
    });
    const hourlyBtn = document.querySelector('#hourly');
    hourlyBtn.addEventListener('click', () => {
        hourlyDOM(object.hourly, 0);
        addDegrees(units);
        if(!hourlyBtn.classList.contains('active')) {
            switchActive()
            addHourlyNavigation(object, units);
        }
    })

    function switchActive () {
        dailyBtn.classList.toggle('active');
        hourlyBtn.classList.toggle('active');
    }
}

function addHourlyNavigation (object, units) {
    hourlyNavDOM();
    const hourChangeBtns = document.querySelectorAll('.change-hours');
    hourChangeBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            hourlyDOM(object.hourly, btn.getAttribute('data-group'));
            addDegrees(units);
            document.querySelector('.active-hours').classList.remove('active-hours');
            btn.classList.add('active-hours');
        })
    })
    const hourLeftBtn = document.getElementById('left-nav');
    hourLeftBtn.addEventListener('click', () => {
        hourlyDOM(object.hourly, getActiveHours('left'));
        addDegrees(units);
    })
    const hourRightBtn = document.getElementById('right-nav');
    hourRightBtn.addEventListener('click', () => {
        hourlyDOM(object.hourly, getActiveHours('right'));
        addDegrees(units);
    })
}

function getActiveHours (direction) {
    const currentButton = document.querySelector('.active-hours');
    currentButton.classList.remove('active-hours');
    const currentGroup = currentButton.getAttribute('data-group');
    let newGroup;
    if (direction === 'left') {
        newGroup = currentGroup - 1;
    }
    else if(direction === 'right') {
        newGroup = Number(currentGroup) + 1;
    }
    if (newGroup < 0) {
        newGroup = 2;
    }
    else if (newGroup > 2) {
        newGroup = 0;
    }
    const newButton = document.querySelector(`[data-group="${ newGroup }"]`);
    newButton.classList.add('active-hours');
    return newGroup;
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

function iconSelector (weather) {
    if (weather === 'Rain') {
        return './icons/cloud-rain.svg';
    }
    else if (weather === 'Snow') {
        return './icons/cloud-snow.svg';
    }
    else if (weather === 'Clear') {
        return './icons/sun.svg';
    }
    else {return './icons/cloud.svg'};
}

function formatString (string) {
    const lowered = string.toLowerCase();
    return lowered.charAt(0).toUpperCase() + lowered.slice(1);
}

export {forecastSwitch, unixToDay, unixToHours, iconSelector, formatString};