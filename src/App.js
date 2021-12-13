import "./App.css";
import React, { Component } from "react";
import { DateTime } from "luxon";

const API_KEY = "33178d46dea4c98a92d98aa6ea4ebc24";
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
      )
      .catch(() => alert("Enter correct city name and reload app"));
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
          weather && weather.main.temp < 0 ? "container cold" : "container"
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
        {weather ? (
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
      </div>
    );
  }
}
