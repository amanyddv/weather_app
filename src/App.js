import React, { useState, useEffect } from 'react';
import CityInput from './components/CityInput';
import CurrentWeather from './components/CurrentWeather';
import Forecast from './components/Forecast';
import './App.css'
import logo from './assets/logo.png';




function App() {
  const [city, setCity] = useState('');
  const [unit, setUnit] = useState('metric');
  
  return (
    
    <div className="app">
    <div className="app-header"> <h1>WeatherApp</h1>
    <img src={logo} alt="logo"></img>
    </div>
    <CityInput city={city} setCity={setCity} setUnit={setUnit} />
     {/* <CurrentWeather city={city} unit={unit} />*/}
   <Forecast city={city} unit={unit} /> 
  </div>
  );
}

export default App;
