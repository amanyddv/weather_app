
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Forecast.css';
const Forecast = ({ city, unit }) => {
  const [forecastData, setForecastData] = useState(null);
  const [iscitynamevalid, setIsCityNameValid] = useState(true);

  useEffect(() => {
    const fetchForecastData = async () => {
      try {
        const response = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=7d82a95552f3aa560e26719202acb6b8`);
        console.log(iscitynamevalid)
        if (city.toLowerCase() != response.data.city.name.toLowerCase()) {
          setIsCityNameValid(false);
        } else if (response.data && response.data.list) {
          setIsCityNameValid(true);
          setForecastData(response.data);
        } else {
          console.error('Unexpected API response:', response);
          setForecastData(null);
          setIsCityNameValid(false);
        }
      } catch (error) {
        setIsCityNameValid(false);
        console.error('Error fetching forecast data:', error);
      }
    };

    fetchForecastData();
  }, [city, unit]);

  const convertTemperature = (temperature) => {
    if (unit === 'metric') {
      return (temperature - 273.15).toFixed(2) + '°C';
    } else {
      return ((temperature - 273.15) * (9 / 5) + 32).toFixed(2) + '°F';
    }
  };

  const renderForecast = () => {
    if (!forecastData || !forecastData.list || !iscitynamevalid) {
      return <p>No forecast data available.</p>;
    }

    const today = new Date();
    const forecastList = forecastData.list.slice(0, 5);

    return (
      <div className="forecast">
        <h2>5-Day Forecast</h2>
        
        <ul>
          
          {forecastList.map((item, index) => (
            <li key={item.dt}>
              <b>Date: {new Date(today.getTime() + index * 24 * 60 * 60 * 1000).toLocaleDateString()}</b>
              <p>
                Average Temperature: {unit === 'metric' ? `${(item.main.temp - 273.15).toFixed(2)}°C` : `${(((item.main.temp - 273.15) * 9 / 5) + 32).toFixed(2)}°F`}
              </p>

              <p>Description: {item.weather[0].description}</p>
              <img
                src={`https://openweathermap.org/img/w/${item.weather[0].icon}.png`}
                alt={item.weather[0].description}
              />
            </li>
          ))}
        </ul>
        
        </div>
    );
  };

  return <div>{iscitynamevalid && renderForecast()}</div>;
};

export default Forecast;
