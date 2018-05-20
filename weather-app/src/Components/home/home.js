import React, { Component } from 'react';
import './home.css';

//Services
import DayConditions  from '../../Services/dayConditions';
import WeatherRequests  from '../../Services/WeatherRequests';

// Components
import MainWeather  from '../mainWeather/mainWeather'

class Home extends Component {

  constructor() {
    super();
    
    this.state = {
        isDay: true,
        mainWeather: {
            name: '',
            skyStatus: '',
            min: 0,
            max: 0,                        
        }
    }
  }

    componentDidMount() {
        WeatherRequests.getCurrentCityPosition().then(position => {
            WeatherRequests.getCityInfo(position).then(info => {
                console.log(info)
                let addresComp = info.data.results[0].address_components,
                    city = this.getAddressComponent(addresComp, 'locality').long_name,
                    country = this.getAddressComponent(addresComp, 'country').short_name;

                WeatherRequests.getCityWeatherByName(city, country).then(weather => {

                    let weatherData = weather.data,
                        weatherObj = {
                        name: `${weatherData.name}, ${country}`,
                        skyStatus: DayConditions.setWeatherSkyIcon(weatherData.weather[0].icon, 'light'),
                        min: Math.floor(weatherData.main.temp_min),
                        max: Math.floor(weatherData.main.temp_max),                        
                    };


                    this.setState({
                        isDay: DayConditions.isDay(weatherData.weather[0].icon),
                        mainWeather: weatherObj
                    });
                });
            });
        });
    }


    render() {
        return (
        <section className={`main-container ${(this.state.isDay) ? 'day' : 'night'}`}>
            <MainWeather 
                name={this.state.mainWeather.name} 
                skyStatus={this.state.mainWeather.skyStatus} 
                min={this.state.mainWeather.min} 
                max={this.state.mainWeather.max}/>
        </section>
        );
    }

    getAddressComponent(components, type) {
        let component;

        component = components.filter(item => {
            return item.types.some(t => t === type)
        })


        return component[0];
    }
}

export default Home;
