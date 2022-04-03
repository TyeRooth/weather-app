import {dailyDOM, hourlyDOM} from "./DOM";

function forecastSwitch (object) {
    const dailyBtn = document.getElementById('daily');
    dailyBtn.addEventListener('click', () => {
        dailyDOM(object.daily);
    });
    const hourlyBtn = document.querySelector('#hourly');
    hourlyBtn.addEventListener('click', () => {
        hourlyDOM(object.hourly);
    })
}

export {forecastSwitch};