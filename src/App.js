import { useState } from "react";
import "./App.css";
import axios from "axios";
import { BsSearch } from 'react-icons/bs';

const api = {
  key: 'a6a41464eff0148d73fb40ed210bf3e3',
  base: 'https://api.openweathermap.org/data/2.5/',
}

function App() {
  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState('');

  const search = async (e) => {
    if (e.key === 'Enter') {
      try {
        const res = await axios.get(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`);
        setWeather(res.data);
        setQuery('');
      } catch (error) {
        console.log(error);
      }
    }
  }

  const presentTime = (d) => {
    let months = ['January', 'February', 'March', 'April', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`;
  }

  const weatherCode = ['Clouds', 'Clear', 'Rain', 'Snow'];

  return (
    <div className={(typeof weather.main != 'undefined') ? (weatherCode.map(data => data === weather.weather[0].main && ` app ${data} `)) : 'app'}>
      <main>
        <div className="search-box">
          <input
            type="text"
            placeholder="Search..."
            className="search-bar"
            onChange={e => setQuery(e.target.value)}
            onKeyUp={search}
          />
          <BsSearch className="icon" />
        </div>
        {(typeof weather.main != 'undefined') ? (
          <div className="statistics">
            <div className="location-box">
              <div className="location">
                <h2>{weather.name}, {weather.sys.country}</h2>
              </div>
              <div className="date">
                <h4>{presentTime(new Date())}</h4>
              </div>
            </div>
            <div className="weather-box">
              <div className="temp">
                <h4>{Math.floor(weather.main.temp)}&#730;c</h4>
              </div>
              <div className="weather">
                <h3>{weather.weather[0].main}</h3>
              </div>
            </div>
          </div>
        ) : <></>}
      </main>
    </div>
  );
}

export default App;