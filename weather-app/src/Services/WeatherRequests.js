import axios from 'axios';
import env from './enviroment'


const WeatherRequests = {
    
    getCityInfo: (locationObject = {lat: '', lng: ''}) => {
        const URL = `${env.googleLocationURL}latlng=${locationObject.lat},${locationObject.lng}&key=${env.googleLocationKey}`;
        
        if (locationObject.lat === '' && locationObject.lng === '') {
            console.error('no Location provided');
        }
        return axios.get(URL)
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

    getCityWeatherByZip: (zip, country) => {
        const URL = `${env.openWeatherURL}/weather?zip=${zip},${country}&appid=${env.openWeatherKey}`;
        return axios.get(URL);
    },

    getCityWeatherByName: (name, country) => {
        const URL = `${env.openWeatherURL}/weather?q=${name},${country}&appid=${env.openWeatherKey}`;
        return axios.get(URL);
    }
}

export default WeatherRequests;