import React from 'react'
import { useState } from 'react' 
import {hot,humidity,wind} from "../logos"


const Content = () => {
    const [city, setCity] = useState('');
    const [weatherData, setWeatherData] = useState(null);
    const [error, setError] = useState(null);
    const   style={
      width:"30px",
      height:"30px",
    }
   
  
    const apiKey = 'faa98712208e6bfc213b820e762a6808'; 
  
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
        );
        const data = await response.json();
  
        if (data.cod === '404') {
          setError('City not found. Please try again.');
        } else {
          setWeatherData(data);
          setError(null);
        }
      } catch (error) {
        setError('Error fetching weather data. Please try again later.');
        console.error(error);
      }
      
    };
  
    const handleInputChange = (e) => {
      setCity(e.target.value);
    };
  
    const handleSearchClick = () => {
      fetchData();
    
    };
  return (
    <div>
      <h2>Weather App</h2>
      <input
        type="text"
        value={city}
        onChange={handleInputChange}
        placeholder="Enter city name"
        style={{
            backgroundColor:'white',
            width:"190px",
            height:"30px",
            marginRight:"4px",
            borderRadius:"5px",
            borderStyle:"none"


        }}
      />
      <button className="search" onClick={handleSearchClick}  style={{
        width:"60px",
        height:"30px",
        borderStyle:"none",
        borderRadius:"3px",
        
        
      }}>Search</button>

      {error && <p>{error}</p>}

      {weatherData && (
        <div>
          <h3 style={{color:"white"}}>{weatherData.name}</h3>
          <li><img  className='logo' src={hot} alt='Temp logo' style={ style } />
          Temperature: {weatherData.main.temp}°C</li>
          <li>Description: {weatherData.weather[0].description}</li>
          <li><img className='logo'  src={humidity}  alt='humidity logo' style={style}/>Humidity: {weatherData.main.humidity}</li>
          <li>Co-ordinates: long-{weatherData.coord.lon} Lat-{weatherData.coord.lat}</li>
          <li>Country: {weatherData.sys.country}</li>
          <li><img  className='logo' src={wind} alt="wind speed" style={style}/>Windspeed: {weatherData.wind.speed}km/hr</li>
          <li>Gust:{weatherData.wind.gust}</li>
        </div>
      )}
      

    </div>
  )
  
}

export default Content