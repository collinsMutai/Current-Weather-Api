import React, { useState, useEffect } from "react";
import axios from "axios";

import info from "./data.json";

const App = () => {
  const [data, setData] = useState(info);

  const searchFunc = (area) => {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${area}&units=imperial&appid=${process.env.REACT_APP_API_KEY}`;

    axios.get(url).then((response) => {
      setData(response.data);
      console.log(response.data);
    });
  };
  useEffect(() => {
    searchFunc("Litein");
  }, []);
  const submitHandler = (event) => {
    event.preventDefault();

    searchFunc(event.target.area.value);
  };
  return (
    <>
      <div className={`app ${data.main["temp"] > 60 ? "sunny" : "cold"}`}>
        <div className="search">
          <form onSubmit={submitHandler}>
            <input type="text" name="area" placeholder="Search City" />
            <button type="submit" className="searchBtn">
              Search
            </button>
          </form>
        </div>
        <div className="container">
          <div className="top">
            <div className="location">
              <p>{data.name}</p>
            </div>
            <div className="temp">
              {data.main ? <h1>{Math.round(data.main["temp"])}℉</h1> : null}
            </div>
            <div className="description">
              {data.main ? <p>{data.weather[0]["main"]}</p> : null}
            </div>
          </div>
          {data.name != undefined && (
            <div className="bottom">
              <div className="feels">
                {data.main ? (
                  <p className="bold">{Math.round(data.main["feels_like"])}℉</p>
                ) : null}
                <p>Feels Like</p>
              </div>
              <div className="humidity">
                {data.main ? (
                  <p className="bold">{Math.round(data.main["humidity"])}%</p>
                ) : null}
                <p>Humidity</p>
              </div>
              <div className="wind">
                {data.main ? (
                  <p className="bold">{Math.round(data.wind["speed"])}MPH</p>
                ) : null}
                <p>Wind Speed</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default App;
