import React, { Component } from "react";
import "./App.css";
import cities from './assets/json/city.list.json'

//Services
import DayConditions from "./Services/dayConditions";
import WeatherRequests from "./Services/WeatherRequests";

// Components
import Header from "./Components/header/header"
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
        isRaining: false
      },
      forecast: [],
      position: { lat: 0, lng: 0 },
      metricSystem: false,
      cities: []
    };

  }

  componentDidMount() {
    WeatherRequests.getCurrentCityPosition().then(this.getFullInfoByPosition.bind(this));
    this.fillCitiesState();
  }

  render() {
    return (
      <div className="App">
        <Header 
          toggleSystem={this.catchToggleMetric.bind(this)}
          selectedElem={this.changeSelection.bind(this)}/>
        <Home 
          isDay={this.state.isDay}
          mainWeather={this.state.mainWeather}
          forecast={this.state.forecast}
          position={this.state.position}/>
        <OtherCities cities={this.state.cities} onClick={this.catchClickEvent.bind(this)} />
      </div>
    );
  }

  catchClickEvent(e) {
    let selectionName = e.currentTarget.getAttribute("name"),
        nameObj = this.splitFullNameIntoCityAndCountry(selectionName),
        selectedPosition = WeatherRequests.getPositionByName(nameObj.city, nameObj.country);

    this.getFullInfoByPosition({lat: selectedPosition.lat, lng: selectedPosition.lon});
  }

  catchToggleMetric(e) {
    this.setState({metricSystem: !this.state.metricSystem});
    this.convertStateSystem();
  }

  changeSelection(e) {
    this.getFullInfoByPosition({
      lat: Number(e.currentTarget.getAttribute("lat")), 
      lng: Number(e.currentTarget.getAttribute("lng"))
    })
  }

  convertStateSystem() {
    let mainWeatherConversion = {
      ...this.state.mainWeather,
      min: WeatherRequests.convertWeatherSystem(this.state.mainWeather.min, this.state.metricSystem),
      max: WeatherRequests.convertWeatherSystem(this.state.mainWeather.max, this.state.metricSystem)
    },
      forecastConversion = this.state.forecast.map(dayForecast => {
        return {
          ...dayForecast,
          temp_min: WeatherRequests.convertWeatherSystem(dayForecast.temp_min, this.state.metricSystem),
          temp_max: WeatherRequests.convertWeatherSystem(dayForecast.temp_max, this.state.metricSystem)
        }
      }),
      citiesConversion = this.state.cities.map(city => {
        return {
          ...city,
          temperature: WeatherRequests.convertWeatherSystem(city.temperature, this.state.metricSystem)
        }
      });

    this.setState({
      mainWeather: mainWeatherConversion,
      forecast: forecastConversion,
      cities: citiesConversion
    });

  }

  fillCitiesState() {
    for (let i = 0; i < 10; i++) {
      let randomIndex = Math.floor(Math.random() * cities.length),
        city = cities[randomIndex];

      WeatherRequests.getCityWeatherByName(city.name, city.country, this.state.metricSystem).then((response) => {
        // No all cities on that API return population ... need to look for a workaround
        WeatherRequests.getCityPopulation(city.name, city.country).then(populationObj => {

          let tempCities = this.state.cities,
            population = (populationObj.data.records[0]) ? populationObj.data.records[0].fields.population : null;
          tempCities.push({
            name: `${city.name}, ${city.country}`,
            temperature: Math.floor(response.data.main.temp),
            skyStatus: DayConditions.setWeatherSkyIcon(response.data.weather[0].icon),
            population: (population) ? populationObj.data.records[0].fields.population : 0
          });

          this.setState({ cities: tempCities })
        })

      });
    }
  }

  getCurrentWeather(position) {
    WeatherRequests.getCityWeatherByCoordinates(position, this.state.metricSystem).then(weather => {
      let weatherData = weather.data,
        country = weatherData.sys.country,
        weatherObj = {
          name: `${weatherData.name}, ${country}`,
          skyStatus: DayConditions.setWeatherSkyIcon(
            weatherData.weather[0].icon,
            "light"
          ),
          min: Math.floor(weatherData.main.temp_min),
          max: Math.floor(weatherData.main.temp_max),
          isRaining: DayConditions.isRaining(weatherData.weather[0].icon)
        };

      this.setState({
        isDay: DayConditions.isDay(weatherData.weather[0].icon),
        mainWeather: weatherObj
      });
    });
  }

  getForcast(position) {
    WeatherRequests.getForecastByCoordinates(position, this.state.metricSystem).then(forecast => {
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
