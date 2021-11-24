import React, { Component } from "react";
import axios from "axios";

class Weather extends Component {
  state = {
    watherInfo: {},
  };

  getPosition() {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject);
    });
  }

  async componentDidMount() {
    const position = await this.getPosition();
    const openCageResponse = await axios.get(
      "https://api.opencagedata.com/geocode/v1/json",
      {
        params: {
          key: "xx",
          q: `${position.coords.latitude}+${position.coords.longitude}`,
        },
      }
    );

    const openWeatherResponse = await axios.get(
      "https://api.openweathermap.org/data/2.5/onecall",
      {
        params: {
          lat: position.coords.latitude,
          lon: position.coords.longitude,
          exclude: "minutely",
          appid: "xx",
        },
      }
    );

    this.setState({
      weatherInfo: {
        city: openCageResponse.data.results[0].components.city,
        temperature: openWeatherResponse.data.current.temp,
      },
    });
    // console.table(position)
  }

  render() {
    return (
      <React.Fragment>
        {this.state.weatherInfo && (
          <React.Fragment>
            <h1>You are in {this.state.weatherInfo.city}</h1>
            <h2>{`Current temperature is ${this.state.weatherInfo.temperature}℃`}</h2>
          </React.Fragment>
        )}
      </React.Fragment>
    );
  }
}

export default Weather;
