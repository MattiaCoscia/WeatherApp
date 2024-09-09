import React, { useState, useEffect } from 'react';

const WeatherApp = () => {
  const [cities, setCities] = useState([]);
  const [newCity, setNewCity] = useState('');

  useEffect(() => {
    const savedCities = JSON.parse(localStorage.getItem('cities'));
    if (savedCities) {
      setCities(savedCities);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('cities', JSON.stringify(cities));
  }, [cities]);

  const addCity = () => {
    if (!cities.includes(newCity) && newCity !== '') {
      setCities([...cities, newCity]);
      setNewCity('');
    }
  };

  const removeCity = (cityToRemove) => {
    setCities(cities.filter(city => city !== cityToRemove));
  };

  return (
    <div>
      <input
        type="text"
        value={newCity}
        onChange={(e) => setNewCity(e.target.value)}
        placeholder="Enter city name"
      />
      <button onClick={addCity}>Add City</button>
      
      <div>
        {cities.map((city, index) => (
          <WeatherCard 
            key={index} 
            cityName={city} 
            onRemove={() => removeCity(city)} 
          />
        ))}
      </div>
    </div>
  );
};

const WeatherCard = ({ cityName, onRemove }) => {
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=YOUR_API_KEY`
    )
      .then((response) => response.json())
      .then((data) => setWeatherData(data))
      .catch((error) => setError(error.message));
  }, [cityName]);

  return (
    <div>
      {error ? (
        <p>{error}</p>
      ) : weatherData ? (
        <div>
          <h2>{weatherData.name}</h2>
          <p>{Math.round(weatherData.main.temp - 273.15)}°C</p>
          <p>{weatherData.weather[0].description}</p>
          <button onClick={onRemove}>Remove</button>
        </div>
      ) : (
        <p>Loading weather data...</p>
      )}
    </div>
  );
};

export default WeatherApp;
