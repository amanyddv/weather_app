
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './CurrentWeather.css'; 

const CurrentWeather = ({ city, unit }) => {
  const [weatherData, setWeatherData] = useState(null);
  const [invalidCity, setInvalidCity] = useState(false);

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=7d82a95552f3aa560e26719202acb6b8`
        );

        setWeatherData(response.data);
        setInvalidCity(false); 
      } catch (error) {
        console.error('Error fetching current weather data:', error);
        setInvalidCity(true);
      }
    };

    if (city) {
      fetchWeatherData();
    }
  }, [city, unit]);

  const convertTemperature = (temperature) => {
    if (unit === 'metric') {
      
      return (temperature - 273.15).toFixed(2) + '°C';
    } else {
      return ((temperature - 273.15) * (9 / 5) + 32).toFixed(2) + '°F';
    }
  };

  return (
    <div className="current-weather">
      {invalidCity ? (
        <p className="error-message">Input city name is invalid please provide a valid city name!</p>
      ) : weatherData ? (
        <>
          <div>
            <h2>Current Weather in {weatherData.name}</h2>
            <p>Temperature: {convertTemperature(weatherData.main.temp)}</p>
            <p>Min Temperature: {convertTemperature(weatherData.main.temp_min)}</p>
              <p>Max Temperature: {convertTemperature(weatherData.main.temp_max)}</p>
            <p>Humidity: {weatherData.main.humidity}%</p>
            <p>Wind Speed: {weatherData.wind.speed} m/s, {weatherData.wind.deg}°</p>
            <p>Description: {weatherData.weather[0].description}</p>
          </div>
          <div>
            <img 
              src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}.png`}
              alt="Weather Icon"
            />
          </div>
        </>
      ) : null}
    </div>
  );
};

export default CurrentWeather;
