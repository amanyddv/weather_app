
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
            <p>Min Temperature: <em> {convertTemperature(weatherData.main.temp_min)}</em></p>
            <p>Max Temperature: <em>{convertTemperature(weatherData.main.temp_max)}</em></p>
            <p>Humidity:<em> {weatherData.main.humidity}</em>%</p>
            <p>Wind Speed: <em>{weatherData.wind.speed} m/s, {weatherData.wind.deg}°</em></p>
            <p>Description:<em> {weatherData.weather[0].description}</em></p>
          </div>
          
          <div className='icon'>
            <img
              src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}.png`}
              alt="Weather Icon"
            />
           <em> <h1>{convertTemperature(weatherData.main.temp)}
          </h1></em>
          </div>
        </>
      ) : null}
    </div>
  );
};

export default CurrentWeather;
