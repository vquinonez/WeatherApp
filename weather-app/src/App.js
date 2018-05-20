import React, { Component } from "react";
import "./App.css";

//Services
import DayConditions from "./Services/dayConditions";
import WeatherRequests from "./Services/WeatherRequests";

// Components
import Home from "./Components/home/home";
import OtherCities from "./Components/otherCities/otherCities";

class App extends Component {
  constructor() {
    super();

    this.state = {
      isDay: true,
      mainWeather: {
        name: '',
        skyStatus: '',
        min: 0,
        max: 0,
      },
      forecast: [],
      position: { lat: 0, lng: 0 }
    };

  }

  componentDidMount() {
    WeatherRequests.getCurrentCityPosition().then(this.getFullInfoByPosition.bind(this));
  }

  render() {
    return (
      <div className="App">
        <Home 
          isDay={this.state.isDay}
          mainWeather={this.state.mainWeather}
          forecast={this.state.forecast}
          position={this.state.position}/>
        <OtherCities onClick={this.catchClickEvent.bind(this)} />
      </div>
    );
  }

  catchClickEvent(e) {
    let selectionName = e.currentTarget.getAttribute("name"),
        nameObj = this.splitFullNameIntoCityAndCountry(selectionName),
        selectedPosition = WeatherRequests.getPositionByName(nameObj.city, nameObj.country);

    this.getFullInfoByPosition({lat: selectedPosition.lat, lng: selectedPosition.lon});
  }

  getCurrentWeather(position) {
    WeatherRequests.getCityWeatherByCoordinates(position).then(weather => {
      let weatherData = weather.data,
        country = weatherData.sys.country,
        weatherObj = {
          name: `${weatherData.name}, ${country}`,
          skyStatus: DayConditions.setWeatherSkyIcon(
            weatherData.weather[0].icon,
            "light"
          ),
          min: Math.floor(weatherData.main.temp_min),
          max: Math.floor(weatherData.main.temp_max)
        };

      this.setState({
        isDay: DayConditions.isDay(weatherData.weather[0].icon),
        mainWeather: weatherObj
      });
    });
  }

  getForcast(position) {
    WeatherRequests.getForecastByCoordinates(position).then(forecast => {
      let dailyForecast = WeatherRequests.convertHourForecastIntoDaily(
        forecast.data.list
      );

      this.setState({
        forecast: dailyForecast.slice(1, 4)
      });
    });
  }

  getFullInfoByPosition(position) {
    this.setState({ position: position });

    this.getCurrentWeather(position);
    this.getForcast(position);
  }

  splitFullNameIntoCityAndCountry(name) {
    let responseArray = name.split(',');

    return {
      city: responseArray[0],
      country: responseArray[1].replace(/\s+/g, '')
    }
  }
}

export default App;
