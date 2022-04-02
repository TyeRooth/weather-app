import { currentDOM } from "./DOM";
import { location } from ".";

function objectifyWeather (data) {
    console.log(data);
    const weather = {
        current: objectifyCurrent(data.current),
        daily: objectifyDaily(data.daily),
        hourly: objectifyHourly(data.hourly)
    }
    console.log(weather);
    return weather;

}

function objectifyCurrent(data) {
    const currentWeather = {
        location: location,
        temperature: data.temp,
        feelsLike: data.feels_like,
        humidity: data.humidity,
        windSpeed: data.wind_speed,
        description: data.weather[0].description
        // Add Icon object later
    }
    currentDOM(currentWeather);
    return currentWeather;
}

function objectifyDaily(data) {
    let dailyForecast = [];
    for(let i = 0; i < 8; i++) {
        const dailyWeather = {
            time: data[i].dt,
            tempMax: data[i].temp.max,
            tempMin: data[i].temp.min,
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
            time: data[i].dt,
            temp: data[i].temp,
            weather: data[i].weather[0].main
        }
        hourlyForecast.push(hourlyWeather);
    }
    return hourlyForecast;    
}



export {objectifyWeather};