import React, { Component } from 'react';
import './searchContainer.css';

import WeatherRequests from '../../../../Services/WeatherRequests';

//Components

class SearchContainer extends Component {

    constructor(props) {
        super(props);

        this.state = {
            citySearch: '',
            countrySearch: '0',
            countries: [],
            cities: []
        }
    }

    componentDidMount() {
        this.setState({
            countries: WeatherRequests.getCountries(),
            cities: WeatherRequests.fiterCities()
        });
    }

    render() {
        return (
            <section className={`search-container ${(this.props.isOpen) ? '' : 'close'}`}>
                <header>
                    <h1>Search</h1>
                    <a onClick={this.props.close} className="fa fa-times"></a>
                </header>
                <div className='search-inputs'>
                    <input type="text" placeholder="City Name" onChange={this.changeCity.bind(this)} />
                    <select placeholder="Country" onChange={this.changeCountry.bind(this)}>
                        <option value="0">Country</option>
                        {
                            this.state.countries.map( (country, index) => {
                                return <option key={index} value={country}>{country}</option>
                            })
                        }
                    </select>
                </div>
                <ul className="search-results">
                    {
                        this.state.cities.map((city, index) => {
                            return <li key={index} ><a lat={city.coord.lar} lng={city.coord.lon} >{city.name}, {city.country}</a></li>
                        })
                    }
                </ul>
            </section>
        )
    }

    changeCity(e) {
        this.setState({
            citySearch: e.target.value,
            cities: WeatherRequests.fiterCities(e.target.value, this.state.countrySearch)
        });
    }

    changeCountry(e) {
        this.setState({
            countrySearch: e.target.value,
            cities: WeatherRequests.fiterCities(this.state.citySearch, e.target.value)
        });
    }
}

export default SearchContainer;