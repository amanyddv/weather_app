import React, { useState }  from 'react';
import './CityInput.css';


const CityInput = ({ city, setCity, unit, setUnit }) => {
  const [localUnit, setlocalUnit] = useState('metric');

  const handleUnitChange = (event) => {
    setlocalUnit(event.target.value);
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
            checked={localUnit === 'metric'}
            onChange={handleUnitChange}
          />
          <span className="unit-text">Celsius</span>
        </label>
        <label className="unit-option">
          <input
            type="radio"
            name="unit"
            value="imperial"
            checked={localUnit === 'imperial'}
            onChange={ handleUnitChange}
          />
          <span className="unit-text">Fahrenheit</span>
        </label>
      </div>
    </div>
  );
};

export default CityInput;
