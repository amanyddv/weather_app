import React from 'react';
import './CityInput.css'; 

const CityInput = ({ city, setCity, setUnit, unit }) => {
  const handleUnitChange = (newUnit) => {
    setUnit(newUnit);
  };

  return (
    <div className="city-input-container">
      <input
        type="text"
        className="city-input-field"
        placeholder="Enter City"
        value={city}
        
        onChange={(e) => setCity(e.target.value)}
      />
      <div className="unit-options">
        <label className="unit-option">
          <input
            type="radio"
            name="unit"
            value="metric"
            checked={unit === 'metric'}
            onChange={() => handleUnitChange('metric')}
          />
          <span className="unit-text">Celsius</span>
        </label>
        <label className="unit-option">
          <input
            type="radio"
            name="unit"
            value="imperial"
            checked={unit === 'imperial'}
            onChange={() => handleUnitChange('imperial')}
          />
          <span className="unit-text">Fahrenheit</span>
        </label>
      </div>
    </div>
  );
};

export default CityInput;
