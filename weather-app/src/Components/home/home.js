import React, { Component } from 'react';
import './home.css';

//Services
import DayConditions  from '../../Services/dayConditions';
import WeatherRequests  from '../../Services/WeatherRequests';

// Components
import MainWeather  from '../mainWeather/mainWeather';
import Forecast  from './forecast/forecast';

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
        },
        forecast: [ ]
    }
  }

    componentDidMount() {
        WeatherRequests.getCurrentCityPosition().then(this.getFullInfo.bind(this));
    }


    render() {
        return (
        <section className={`main-container ${(this.state.isDay) ? 'day' : 'night'}`}>
            <MainWeather 
                name={this.state.mainWeather.name} 
                skyStatus={this.state.mainWeather.skyStatus} 
                min={this.state.mainWeather.min} 
                max={this.state.mainWeather.max}/>
            <div className="container">
                <div className="half">
                    {
                        this.state.forecast.map((item, index) => {
                            return (<Forecast 
                                key={index}
                                date={{
                                    ...item.date,
                                    month: DayConditions.getMonthName(item.date.month)
                                }}
                                skyStatus={DayConditions.setWeatherSkyIcon(item.skyStatus)}
                                min={Math.floor(item.temp_min)}
                                max={Math.floor(item.temp_max)}/>)
                        })
                    }
                </div>
                <div className="half">
                a
                </div>
            </div>
        </section>
        );
    }
    
    getCurrentWeather(position) {
        WeatherRequests.getCityWeatherByCoordinates(position).then(weather => {
            
            let weatherData = weather.data,
            country = weatherData.sys.country,
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
    }

    getForcast(position) {
        WeatherRequests.getForecastByCoordinates(position).then(forecast => {
            let dailyForecast = WeatherRequests.convertHourForecastIntoDaily(forecast.data.list);

            this.setState({
                forecast: dailyForecast.slice(1,4)
            });
        });
    }

    getFullInfo(position) {
        this.getCurrentWeather(position);
        this.getForcast(position);
    }
}

export default Home;
