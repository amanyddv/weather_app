import React, { useState, useEffect } from 'react';
import CityInput from './components/CityInput';
import CurrentWeather from './components/CurrentWeather';
import Forecast from './components/Forecast';
import './App.css'
import logo from './assets/logo.png';

function App() {
  // State to track the selected city and temperature unit
  const [city, setCity] = useState('Bengaluru');
  const [unit, setUnit] = useState('celcius'); // Consider fixing the typo ('celcius' -> 'celsius')

  // Render the main application structure
  return (
    <div className="app">
      {/* Header section with app name and logo */}
      <div className="app-header">
        <h1>WeatherApp</h1>
        <img src={logo} alt="logo"></img>
      </div>

      {/* CityInput component for entering city name and selecting temperature unit */}
      <CityInput city={city} setCity={setCity} setUnit={setUnit} />

      {/* CurrentWeather component to display the current weather information */}
      <CurrentWeather city={city} unit={unit} />

      {/* Forecast component to display the 5-day weather forecast */}
      <Forecast city={city} unit={unit} />
    </div>
  );
}

export default App;
