import React, { Component } from 'react';
import './otherCities.css';

// Services
import WeatherRequests from '../../Services/WeatherRequests';
import DayConditions from '../../Services/dayConditions';

// Components
import CityExtract from './cityExtract/cityExtract'

class OtherCities extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
    }

    render() {
        return (
            <footer>
                <header>
                    <h1>Other Cities</h1>
                </header>
                <div className="cities-list">
                    {
                        this.props.cities.map((city, index) => {
                            return (<CityExtract 
                                        key={index} 
                                        name={city.name} 
                                        skyStatus={city.skyStatus} 
                                        temperature={city.temperature}
                                        onClick={this.props.onClick}
                                        />);
                        })
                    }
                </div>
                
            </footer>
        );
    }
}

export default OtherCities;