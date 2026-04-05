import { useState, useEffect } from 'react'
import axios from 'axios'

const Weather = ({ city }) => {
  const [weatherData, setWeatherData] = useState(null)
  const api_key = import.meta.env.VITE_WEATHER_KEY 

  useEffect(() => {
    axios
      .get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}&units=metric`)
      .then(response => {
        setWeatherData(response.data)
      })
      .catch(error => console.log('Weather error:', error))
  }, [city, api_key])

  if (!weatherData) return <p>Loading weather...</p>

  return (
    <div>
      <h3>Weather in {city}</h3>
      <div>Temperature {weatherData.main.temp} Celsius</div>
      <img 
        src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`} 
        alt="weather icon" 
      />
      <div>Wind {weatherData.wind.speed} m/s</div>
    </div>
  )
}

export default Weather