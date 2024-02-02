import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './CurrentWeather.css';
import { FaWind, FaTemperatureArrowUp, FaTemperatureArrowDown } from "react-icons/fa6";
import { WiHumidity } from "react-icons/wi";

const CurrentWeather = ({ city, unit }) => {

  // State to store weather data and track if the entered city is invalid
  const [weatherData, setWeatherData] = useState(null);
  const [isCityInvalid, setIsCityInvalid] = useState(false);

  // Fetch weather data when the component mounts or when city/unit changes
  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=7d82a95552f3aa560e26719202acb6b8`
        );

        // Update weather data and set city as valid
        setWeatherData(response.data);
        setIsCityInvalid(false);

      } catch (error) {     
          console.error('Error fetching current weather data:', error);
          setIsCityInvalid(true);
      }
    };

    // Fetch data only if the city is provided
    if (city) {
      fetchWeatherData();
    }
  }, [city, unit]);

  // Function to convert temperature based on the unit
  const convertTemperature = (temperature) => {
    if (unit === 'celsius') {
      return (temperature - 273.15).toFixed(2) + '°C';
    } else {
      return ((temperature - 273.15) * (9 / 5) + 32).toFixed(2) + '°F';
    }
  };

  // Function to get wind direction based on degree
  const getWindDirection = (degree) => {
    const cardinalDirections = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
    const index = Math.round((degree % 360) / 45) % 8;
    return cardinalDirections[index];
  };

  return (
    <div className="current-weather">

      {/* Display an error message if the entered city is invalid */}
      {isCityInvalid ? (
        <p className="error-message">The entered city name is invalid. Please provide a valid city name!</p>
      ) : weatherData ? (
        <>

          {/* Display current weather information if data is available */}
          <div>
            <h2>Current Weather in {weatherData.name}</h2>
            <p><abbr className="no-underline" title="Minimum Temperature"><FaTemperatureArrowDown /> <strong>{convertTemperature(weatherData.main.temp_min)}</strong></abbr></p>
            <p><abbr className="no-underline" title="Maximum Temperature"><FaTemperatureArrowUp /> <strong>{convertTemperature(weatherData.main.temp_max)}</strong></abbr></p>
            <p><abbr className="no-underline" title="Humidity"><WiHumidity /><strong>{weatherData.main.humidity}%</strong></abbr></p>
            <p> 
              <abbr className="no-underline" title="Wind Speed & Direction">
                <FaWind /> <strong>{weatherData.wind.speed} m/s  {getWindDirection(weatherData.wind.deg)}</strong>
              </abbr>
            </p>
          </div>

          <div className='icon'>

            {/* Display weather icon */}
            <abbr title={weatherData.weather[0].description}>
              <img
                src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}.png`}
                alt="Weather Icon"
              />
            </abbr>

            <h1>
              {/* Display current temperature and description*/}
              <abbr className="no-underline" title="Current Temperature">{convertTemperature(weatherData.main.temp)}</abbr>
              <p><abbr className="no-underline" title="Weather">{weatherData.weather[0].description}</abbr></p>
            </h1>
          </div>

        </>
      ) : null}
    </div>
  );
};

export default CurrentWeather;
