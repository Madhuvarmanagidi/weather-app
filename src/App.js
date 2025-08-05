import React, { useState } from 'react';
import './App.css';
import logo from './assets/image.png';
import Rain from './assets/Rain 2.png';
import Temp from './assets/Temp 2.png';
import Humidity from './assets/Humidity.png';
import Wind from './assets/Wind.png';
import axios from 'axios';
import bg from './assets/backgrounds/2.jpg';

const styles = {
  backgroundImage: `url(${bg})`,
  backgroundSize: 'cover',
  height: '100vh',
};

function App() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);

  const fetchWeather = async () => {
    const trimmedCity = city.trim();

    // Basic validation for city name or ZIP code
    if (!/^[a-zA-Z0-9\s]+$/.test(trimmedCity)) {
      alert("Please enter a valid city name or ZIP code");
      return;
    }

    if (!trimmedCity) {
      alert("Please enter a location");
      return;
    }

    const apiKey = '0542b83b2b78476bbfe40122250508'; // Make sure no space at end
    const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${trimmedCity}`;

    try {
      const response = await axios.get(url);
      setWeather(response.data);
    } catch (error) {
      console.error('Error fetching weather:', error);
      alert("Couldn't fetch weather data. Please check the city/ZIP and try again.");
    }
  };

  return (
  <div className="app" style={{ backgroundImage: `url(${bg})` }}>
      {/* NAVBAR */}
      <header className="navbar">
        <img src={logo} alt="NextBridge Logo" className="logo" />
        <nav>
          <ul>
            <li>Home</li>
            <li>Forecast</li>
            <li>About</li>
            <li>Contact</li>
          </ul>
        </nav>
      </header>

      {/* MAIN CONTENT */}
      <div className="main-content">
        {/* LEFT SIDE */}
        <div className="left-panel">
          <h1>Welcome to Our Weather Forecast App</h1>
          <p style={{color: 'black'}}>
            Get the most accurate and real-time weather updates for 
            cities all across India. Whether you're planning a trip, stepping 
            out for the day, or simply curious about the climate, our platform provides 
            instant access to live weather data tailored for your location. With just a city 
            name or supported ZIP code, you can retrieve key details such as 
            temperature, humidity, wind speed, and general weather conditions — all in one convenient place.
<br/>
<br/>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Our intuitive search functionality ensures that you can quickly 
            find weather information for any city without hassle. From major 
            metros like Delhi, Mumbai, and Bangalore to smaller towns across 
            the country, we aim to keep you informed and prepared. 
            Stay ahead of sudden changes in climate and make smarter decisions 
            with trusted, real-time insights delivered through a clean and user-friendly interface.
          </p>
        </div>

        {/* RIGHT SIDE */}
        <div className="right-panel">
          <div className="search-section">
            <input
              type="text"
              placeholder="Enter city or ZIP code"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
            <button onClick={fetchWeather}>Search</button>
          </div>
          <p style={{ marginTop: '15px',marginLeft: '90px', width: '450px', textDecoration: 'bold'}}>
              Note: For Indian weather, ZIP code searches may not 
              return accurate results. Please use city names instead. 
              ZIP codes are more reliable for weather searches in 
              countries like the USA, Canada, and parts of Europe.
            </p>

          {weather && (
            <div className="result-section">
              <h2>{weather.location.name}, {weather.location.region}</h2>
              <div className='results'>
                <div className='results_1'>
                  <div className='results_2'><img src={Rain} alt="Rain" className="rain" /> {weather.current.condition.text}</div>
                  <div className='results_2'><img src={Temp} alt="Temperature" className="temp" /> Temperature: {weather.current.temp_c}°C</div>
                </div>
                <div className='results_1'>
                  <div className='results_2'><img src={Humidity} alt="Humidity" className="humidity" /> Humidity: {weather.current.humidity}%</div>
                  <div className='results_2'><img src={Wind} alt="Winds" className="wind" /> Wind: {weather.current.wind_kph} km/h</div>
                </div>  
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
