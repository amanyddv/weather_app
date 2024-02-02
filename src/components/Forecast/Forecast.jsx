import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Forecast.css';
import { GiThermometerScale } from "react-icons/gi";

const Forecast = ({ city, unit }) => {

  // State to store forecast data and validate the city name
  const [forecastData, setForecastData] = useState(null);
  const [isValidCityName, setIsValidCityName] = useState(true);

  // Fetch forecast data when city or unit changes
  useEffect(() => {

    // Function to fetch forecast data from OpenWeatherMap API
    const fetchForecastData = async () => {
      try {
        const response = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=7d82a95552f3aa560e26719202acb6b8`);
        
        // Validate if the fetched data matches the input city name
        if (city.toLowerCase() !== response.data.city.name.toLowerCase()) {
          setIsValidCityName(false);
        } 
        else if (response.data && response.data.list) {
          setIsValidCityName(true);
          setForecastData(response.data);
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
    if (!forecastData || !forecastData.list || !isValidCityName) {
      return <p>No forecast data available.</p>;
    }

    // Get today's date and extract the first 5 forecast items
    const today = new Date();
    const forecastList = forecastData.list.slice(0, 5);

    // Render the forecast items
    return (
      <div className="forecast">
        <h2>5-Day Forecast</h2>
        
        <ul>
          {forecastList.map((item, index) => (
            <li key={item.dt}>
              <b><h3>{new Date(today.getTime() + index * 24 * 60 * 60 * 1000).toLocaleDateString(undefined, { weekday: 'short' , year: 'numeric', month: 'long', day: 'numeric', })}</h3></b>
              
              <p>
                {/* Display average temperature with icon and description */}
                <abbr className="no-underline" title="Average Temperature">
                  <GiThermometerScale />
                  <strong>{convertTemperature(item.main.temp)}</strong>
                </abbr> 
                <abbr className="no-underline" title={item.weather[0].description}>
                  <img
                    src={`https://openweathermap.org/img/w/${item.weather[0].icon}.png`}
                    alt={item.weather[0].description}
                  />
                </abbr>
              </p>

              <p>
                {/* Display weather description */}
                <abbr className="no-underline" title="Weather">
                  <em>{item.weather[0].description}</em>
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
