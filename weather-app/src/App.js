import React, { useState } from "react";
import Button from '@mui/material/Button';
import TextField from "@mui/material/TextField";
import axios from "axios";
function App() {

  const [cityname, setCityname] = useState("London")
  const [weather, setWeather] = useState(null);
  const API_KEY = process.env.REACT_APP_API_KEY;
  const URL = `http://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=`;
  
  
  const getWeather = () => {
    
    axios
      .get(URL+cityname)
      .then(response => {
        setWeather(response.data)
        
      })
      
  }


  return (
    <div className="main">
      <h1>React Weather Application</h1>
      <p>
        This application will fetch a weather forecast from the OpenWeather.
        Just type city name and click Get Forecast button!
      </p>
      <form>
        <TextField className="textmain" label="Cityname" defaultValue="London" id="outlined-basic" onChange={ (e) => setCityname(e.target.value)}/>
        <Button className="button1" variant="contained" color="primary" size="small" onClick={() => getWeather()}>
          Get Forecast
        </Button>
      </form>
      
      
      {weather !== null &&
        <div className="weather">
          <h2>Loaded weather forecast</h2>
          <p className="data">City: {weather.location.name}</p><br/>
          <p className="data">Condition: {weather.current.condition.text}</p><br/>
          <p className="data">Temp: {weather.current.temp_c}°C</p><br/>
          <p className="data">Feels like: {weather.current.feelslike_c}°C</p><br/>
          <p className="data">Wind: {weather.current.wind_kph}km/h</p><br/>
          <p className="data">Humidity: {weather.current.humidity}%</p><br/>
          <a href="https://www.weatherapi.com/" title="Free Weather API"><img src='//cdn.weatherapi.com/v4/images/weatherapi_logo.png' alt="Weather data by WeatherAPI.com" border="0"/></a>
        </div>
      }

    </div>
    
  );
}

export default App;
