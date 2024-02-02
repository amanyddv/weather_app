import React, { useState }  from 'react';
import './CityInput.css';

// CityInput component for entering city name and selecting temperature unit
const CityInput = ({ city, setCity, unit, setUnit }) => {
  // Local state to track the selected temperature unit in the component
  const [localTemperatureUnit, setLocalTemperatureUnit] = useState('celcius');

  // Function to handle changes in the selected temperature unit
  const handleUnitChange = (event) => {
    // Update local state and propagate changes to parent component
    setLocalTemperatureUnit(event.target.value);
    setUnit(event.target.value);
  };

  return (
    <div className="city-input-container">
      {/* Input field for entering the city name */}
      <input
        type="text"
        className="city-input-field"
        placeholder="Enter City"
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />

      {/* Temperature unit options */}
      <div className="unit-options">
        {/* Celsius option */}
        <label className="unit-option">
          <input
            type="radio"
            name="unit"
            value="celcius"
            checked={localTemperatureUnit === 'celcius'}
            onChange={handleUnitChange}
          />
          <span className="unit-text">Celsius</span>
        </label>

        {/* Fahrenheit option */}
        <label className="unit-option">
          <input
            type="radio"
            name="unit"
            value="fahrenheit"
            checked={localTemperatureUnit === 'fahrenheit'}
            onChange={handleUnitChange}
          />
          <span className="unit-text">Fahrenheit</span>
        </label>
      </div>
    </div>
  );
};

export default CityInput;
