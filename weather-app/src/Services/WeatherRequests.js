import axios from 'axios';
import env from './enviroment';
import cities from '../assets/json/city.list.json';

const WeatherRequests = {
    
    /* getCityInfo: (locationObject = {lat: '', lng: ''}) => {
        const URL = `${env.googleLocationURL}latlng=${locationObject.lat},${locationObject.lng}&key=${env.googleLocationKey}`;
        
        if (locationObject.lat === '' && locationObject.lng === '') {
            console.error('no Location provided');
        }
        return axios.get(URL)
    }, */

    convertHourForecastIntoDaily(forecast) {

        return forecast.reduce( (reduced, item) => {
            let responseObj = {}
            if (reduced.length === 0) {
                responseObj = {
                    temp_min: item.main.temp_min,
                    temp_max: item.main.temp_max,
                    skyStatus: item.weather[0].icon,
                    date: this.formatDateIntoCustomObject(item.dt_txt)
                }

                reduced.push(responseObj);
            } else {
                let currentDate = this.formatDateIntoCustomObject(item.dt_txt),
                    lastValue = reduced[reduced.length-1];
                
                if ( JSON.stringify(currentDate) ===  JSON.stringify(lastValue.date) ) {
                    responseObj = {
                        temp_min: this.getAverageValue(item.main.temp_min, lastValue.temp_min),
                        temp_max: this.getAverageValue(item.main.temp_max, lastValue.temp_max),
                        skyStatus: item.weather[0].icon,
                        date: this.formatDateIntoCustomObject(item.dt_txt)
                    }

                    reduced[reduced.length-1] = responseObj;                    
                } else {
                    responseObj = {
                        temp_min: item.main.temp_min,
                        temp_max: item.main.temp_max,
                        skyStatus: item.weather[0].icon,
                        date: this.formatDateIntoCustomObject(item.dt_txt)
                    }
    
                    reduced.push(responseObj);
                }
            }

            return reduced;  
                      
        }, []);
    },

    convertWeatherSystem: (temperature, metricSystem = false) => {
        if (metricSystem) {
            // Celsius
            return Math.floor(((9/5) * temperature) + 32 );
        } else {
            // Farenheit
            return Math.floor((temperature - 32 )* (5/9));
        }
    },

    fiterCities: (name = '', country = '0') => {
        return cities.filter(city => {
            let valName = true,
                valCountry = true;
            if (name !== ''){
                valName = city.name.toLowerCase().includes(name.toLowerCase());
            } else {
                valName = city.name.toLowerCase().includes('a');
            }
            if (country !== '0'){
                valCountry = city.country == country;
            }
            
            return valName && valCountry;
        }).sort((a, b) => {
            if (a.name < b.name) return -1;
            if (a.name > b.name) return 1;
            return 0;
        }).slice(0, 25);
    },

    formatDateIntoCustomObject(dateString) {
        let date = new Date(dateString)
        return {
            month: date.getMonth(),
            day: date.getDate(),
            year: date.getFullYear()
        }
    },

    getAverageValue(a, b) {
        return (a + b) / 2;
    },

    getCurrentCityPosition: () => {
        let geoLocator = window.navigator.geolocation,
            self = this;

        return new Promise( ( resolve, reject ) => {
            geoLocator.getCurrentPosition( ( position ) => {
                resolve( { lat: position.coords.latitude, lng: position.coords.longitude } );
            }, () => { reject( 'We could not get your location.' ); } );
        });
    },  

    getCityWeatherByCoordinates: (coords = {lat: '0', lng: '0'}, metric = false) => {
        const URL = `${env.openWeatherURL}/weather?lat=${coords.lat}&lon=${coords.lng}&appid=${env.openWeatherKey}&units=${(metric) ? 'metric' : 'imperial'}`;
        return axios.get(URL);
    },
    
    getCityWeatherByName: (name, country, metric = false) => {
        const URL = `${env.openWeatherURL}/weather?q=${name},${country}&appid=${env.openWeatherKey}&units=${(metric) ? 'metric' : 'imperial'}`;
        return axios.get(URL);
    },
    
    /* getCityWeatherByZip: (zip, country) => {
        const URL = `${env.openWeatherURL}/weather?zip=${zip},${country}&appid=${env.openWeatherKey}`;
        return axios.get(URL);
    }, */
    
    getCityPopulation: (city, country) => {
        const URL = `${env.worldPopulation}&q=${city.toLowerCase()}&rows=1&sort=population&facet=country&refine.country=${country.toLowerCase()}`;
        return axios.get(URL);
    },

    getCountries: () => {
        return cities.reduce((reduced, item) => {
            let country = item.country;
            if (!reduced.some(c => c === country) && country !== ''){
                reduced.push(country)
            }

            return reduced;
        }, []).sort();
    },
    
    getForecastByCoordinates: (coords = {lat: '0', lng: '0'}, metric = false) => {
        const URL = `${env.openWeatherURL}/forecast?lat=${coords.lat}&lon=${coords.lng}&appid=${env.openWeatherKey}&units=${(metric) ? 'metric' : 'imperial'}`;
        return axios.get(URL);
    },

    getPositionByName: (name, country) => {
        return cities.find(city => city.name === name && city.country === country).coord;
    }

}

export default WeatherRequests;