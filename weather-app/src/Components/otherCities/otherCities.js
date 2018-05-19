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
        console.log('render', this.state.cities)
        return (
            <footer>
                <header>
                    <h1>Other Cities</h1>
                </header>
                <div className="cities-list">
                    {
                        this.state.cities.map((city, index) => {
                            return (<CityExtract key={index} name={city.name} temperature={city.temperature}/>);
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
                let tempCities = this.state.cities;
                
                tempCities.push({
                    name:`${city.name}, ${city.country}`,
                    temperature: Math.floor(response.data.main.temp)
                });

                this.setState({cities: tempCities})
            });
        }
    }
}

export default OtherCities;