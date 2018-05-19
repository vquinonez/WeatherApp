import React, { Component } from 'react';
import './otherCities.css';
import cities from '../../assets/json/city.list.json'

// Services
import WeatherRequests from '../../Services/WeatherRequests';

// Components
import CityExtract from './cityExtract/cityExtract'

class OtherCities extends Component {
    constructor(props) {
        super(props);

        this.state = {
            cities: []
        }
    }

    componentDidMount() {
        this.fillCitiesState();
    }

    render() {
        return (
            <footer>
                <header>
                    <h1>Other Cities</h1>
                </header>
                <div className="cities-list">
                    {
                        this.state.cities.map((city, index) => {
                            return (<CityExtract key={index} name={city.name} skyStatus={city.skyStatus} temperature={city.temperature}/>);
                        })
                    }
                </div>
                
            </footer>
        );
    }

    fillCitiesState(){
        for (let i = 0; i < 10; i++) {
            let randomIndex = Math.floor( Math.random() * cities.length),
            city = cities[randomIndex];

            WeatherRequests.getCityWeatherByName(city.name, city.country).then((response)=>{
                // No all cities on that API return population ... need to look for a workaround
                WeatherRequests.getCityPopulation(city.name, city.country).then(populationObj => {
                    
                    let tempCities = this.state.cities,
                        population = (populationObj.data.records[0]) ? populationObj.data.records[0].fields.population : null;
                        tempCities.push({
                            name:`${city.name}, ${city.country}`,
                            temperature: Math.floor(response.data.main.temp),
                            skyStatus: this.setWeatherSkyIcon(response.data.weather[0].icon),
                            population: (population) ? populationObj.data.records[0].fields.population : 0
                        });

                    this.setState({cities: tempCities})
                })

            });
        }
    }

    setWeatherSkyIcon(weatherKey) {
        let response = 'http://via.placeholder.com/50?text=No+data';

        switch(weatherKey) {
            case'01d':
                response = '/001lighticons-28.png';
                break;
            case'01n':
                response = '/001lighticons-29.png';
                break;
            case'02d':
                response = '/001lighticons-30.png';
                break;
            case'02n':
                response = '/001lighticons-31.png';
                break;
            case'03d': case'03n':
                response = '/001lighticons-32.png';            
                break;
            case'04d': case'04n':
                response = '/001lighticons-41.png';
                break;
            case'09d': case'09n':
                response = '/001lighticons-34.png';                
                break;
            case'10d': case'10n':
                response = '/001lighticons-40.png';                
                break;
            case'11d': case'11n':
                response = '/001lighticons-42.png';                
                break;
            case'13d': case'13n':
                response = '/001lighticons-42.png';
                break;
            case'50d': case'50n':
                response = '/001lighticons-13.png';            
                break;
            default:
                console.log(weatherKey)
                response = null
                break;
        }

        return response;
    }
}

export default OtherCities;