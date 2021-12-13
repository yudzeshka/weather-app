import "./App.css";
import React, { Component } from "react";
import { DateTime } from "luxon";
const API_KEY = process.env.REACT_APP_API_KEY;
const API_URL = "https://api.openweathermap.org/data/2.5/";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchQuerry: "",
      weather: null,
      isLoading: false,
    };
  }

  handleSearchChange = (e) => {
    this.setState({
      searchQuerry: e.target.value,
    });
  };

  searchRequest = () => {
    const { searchQuerry } = this.state;
    fetch(`${API_URL}weather?q=${searchQuerry}&appid=${API_KEY}&units=metric`)
      .then((response) => response.json())
      .then((response) =>
        this.setState({ weather: response, isLoading: false })
      );
  };

  handleSearchSubmit = (e) => {
    const { isLoading } = this.state;
    if (e.key !== "Enter" || isLoading) {
      return;
    }
    this.setState(
      {
        isLoading: true,
      },
      this.searchRequest
    );
  };

  render() {
    const { searchQuerry, weather, isLoading } = this.state;

    return (
      <div
        className={
          weather && weather.main && weather.main.temp < 0
            ? "container cold"
            : "container"
        }
      >
        <input
          type="text"
          placeholder="Search..."
          className="search-input"
          value={searchQuerry}
          onChange={this.handleSearchChange}
          onKeyDown={this.handleSearchSubmit}
        />
        {isLoading ? (
          <div className="loader-container">
            {" "}
            <div className="loader"></div>
          </div>
        ) : null}

        {weather && weather.cod === 200 ? (
          <div className="location-wrapper">
            <div className="location">
              {weather.name}, {weather.sys.country}
            </div>
            <div className="date">
              {DateTime.fromSeconds(weather.dt).toLocaleString(
                DateTime.DATE_HUGE
              )}
            </div>
            <div className="weather-wrapper">
              <div className="temp">{Math.round(weather.main.temp)} °C</div>
              <div className="weather">{weather.weather[0].main}</div>
            </div>
          </div>
        ) : null}

        {weather && weather.cod === "404" ? (
          <div> Enter other city name</div>
        ) : null}
      </div>
    );
  }
}
