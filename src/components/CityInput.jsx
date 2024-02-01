import React, { useState }  from 'react';
import './CityInput.css'; 

const CityInput = ({ city, setCity, unit, setUnit }) => {
  const [unitc, setUnitc] = useState('metric');

  const handleUnitChange = (event) => {
    setUnitc(event.target.value);
    setUnit(event.target.value);
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
            checked={unitc === 'metric'}
            onChange={handleUnitChange}
          />
          <span className="unit-text">Celsius</span>
        </label>
        <label className="unit-option">
          <input
            type="radio"
            name="unit"
            value="imperial"
            checked={unitc === 'imperial'}
            onChange={ handleUnitChange}
          />
          <span className="unit-text">Fahrenheit</span>
        </label>
      </div>
    </div>
  );
};

export default CityInput;
