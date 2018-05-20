import React, { Component } from 'react';
import './otherCities.css';
import cities from '../../assets/json/city.list.json'

// Services
import WeatherRequests from '../../Services/WeatherRequests';
import DayConditions from '../../Services/dayConditions';

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
                            skyStatus: DayConditions.setWeatherSkyIcon(response.data.weather[0].icon),
                            population: (population) ? populationObj.data.records[0].fields.population : 0
                        });

                    this.setState({cities: tempCities})
                })

            });
        }
    }
}

export default OtherCities;