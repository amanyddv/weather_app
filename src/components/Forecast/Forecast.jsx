import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Forecast.css';
import { GiThermometerScale } from 'react-icons/gi';

const Forecast = ({ city, unit }) => {
  const [forecastData, setForecastData] = useState(null);
  const [isValidCityName, setIsValidCityName] = useState(true);

  useEffect(() => {

    // Function to fetch forecast data from OpenWeatherMap API
    const fetchForecastData = async () => {
      try {
        const response = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=7d82a95552f3aa560e26719202acb6b8`);

        // Object to store daily weather information
        const dailyWeatherInfo = {};

        // Check if the city name from the API response matches the input city
        if (city.toLowerCase() !== response.data.city.name.toLowerCase()) {
          setIsValidCityName(false);
        } 
        else if (response.data.list) {

          // Loop through the WeatherData array to extract information
          response.data.list.forEach((data) => {
            const date = data.dt_txt.split(' ')[0];
            const temperature = data.main.temp;
            const weatherDescription = data.weather[0].description;
            const icon = data.weather[0].icon;

            // If the date is not already in the dailyWeatherInfo object, add it
            if (!dailyWeatherInfo[date]) {
              dailyWeatherInfo[date] = {
                temperatures: [temperature],
                description: weatherDescription,
                icon,
              };
            } 
            else {
              // If the date is already in the object, add the temperature to the array
              dailyWeatherInfo[date].temperatures.push(temperature);
            }
          });

          // Calculate average temperature for each date
          Object.keys(dailyWeatherInfo).forEach((date) => {
            const temperatures = dailyWeatherInfo[date].temperatures;
            const averageTemperature = temperatures.reduce((sum, temp) => sum + temp, 0) / temperatures.length;
            dailyWeatherInfo[date].averageTemperature = averageTemperature;
          });

          // Set city name as valid
          setIsValidCityName(true);

          // Slice the array to get the first 5 days
          const weatherArray = Object.entries(dailyWeatherInfo);
          const slicedArray = weatherArray.slice(0, 5);

          // Set forecastData state
          setForecastData(slicedArray);
        } 
        else {
          console.error('Unexpected API response:', response);
          setForecastData(null);
          setIsValidCityName(false);
        }
      }
       catch (error) {
        setIsValidCityName(false);
        console.error('Error fetching forecast data:', error);
      }
    };

    fetchForecastData();
  }, [city, unit]);

  // Function to convert temperature based on unit
  const convertTemperature = (temperature) => {
    if (unit === 'celsius') {
      return `${(temperature - 273.15).toFixed(2)}°C`;
    } 
    else {
      return `${(((temperature - 273.15) * 9 / 5) + 32).toFixed(2)}°F`;
    }
  };

  // Function to render the forecast UI
  const renderForecast = () => {
    // Check if forecast data is available and city name is valid
    if (!forecastData || !isValidCityName) {
      return <p>No forecast data available.</p>;
    }

    // Render the forecast items
    return (
      <div className="forecast">
        <h2>5-Day Forecast</h2>

        <ul>
          {forecastData.map(([date, item]) => (
            <li key={date}>
              <b>
                <h3>
                  {new Date(date).toLocaleDateString(undefined, {
                    weekday: 'short',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </h3>
              </b>

              <p>
                {/* Display average temperature with icon and description */}
                <abbr className="no-underline" title="Average Temperature">
                  <GiThermometerScale />
                  <strong>{convertTemperature(item.averageTemperature)}</strong>
                </abbr>
                <abbr className="no-underline" title={item.description}>
                  <img
                    src={`https://openweathermap.org/img/w/${item.icon}.png`}
                    alt={item.description}
                  />
                </abbr>
              </p>

              <p>
                {/* Display weather description */}
                <abbr className="no-underline" title="Weather">
                  <em>{item.description}</em>
                </abbr>
              </p>
            </li>
          ))}
        </ul>
      </div>
    );
  };

  // Render the component with forecast data if the city name is valid
  return <div>{isValidCityName && renderForecast()}</div>;
};

export default Forecast;
