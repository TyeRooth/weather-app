import { currentDOM } from "./DOM";
import { location } from ".";

function objectifyWeather (data) {
    const weather = {
        current: objectifyCurrent(data.current),
        daily: objectifyDaily(data.daily),
        hourly: objectifyHourly(data)
    }
    console.log(weather);
    return weather;

}

function objectifyCurrent(data) {
    const currentWeather = {
        location: location,
        temperature: Math.round(Number(data.temp)),
        feelsLike: Math.round(Number(data.feels_like)),
        humidity: data.humidity,
        windSpeed: data.wind_speed,
        description: data.weather[0].description
    }
    currentDOM(currentWeather);
    return currentWeather;
}

function objectifyDaily(data) {
    let dailyForecast = [];
    for(let i = 0; i < 8; i++) {
        const dailyWeather = {
            time: data[i].dt,
            tempMax: Math.round(Number(data[i].temp.max)),
            tempMin: Math.round(Number(data[i].temp.min)),
            weather: data[i].weather[0].main     
        }
        dailyForecast.push(dailyWeather);
    }
    return dailyForecast;
}

function objectifyHourly(data) {
    let hourlyForecast = [];
    for(let i = 1; i < 25; i++) {
        const hourlyWeather = {
            time: data.hourly[i].dt,
            temp: Math.round(Number(data.hourly[i].temp)),
            weather: data.hourly[i].weather[0].main,
            offset: data.timezone_offset
        }
        hourlyForecast.push(hourlyWeather);
    }
    return hourlyForecast;    
}

export {objectifyWeather};