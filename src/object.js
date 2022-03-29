

function objectifyCurrentWeather (data) {
    const currentWeather = {
        location: data.name,
        temperature: data.main.temp,
        feelsLike: data.main.feels_like,
        humidity: data.main.humidity,
        description: data.weather[0].description,
        windSpeed: data.wind.speed,
        icon: data.weather[0].icon,  
    }
    return currentWeather;
}

export {objectifyCurrentWeather};