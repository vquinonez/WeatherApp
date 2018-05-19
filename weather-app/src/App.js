import React, { Component } from 'react';
import './App.css';

// Components
import OtherCities from './Components/otherCities/otherCities';

class App extends Component {

  constructor() {
    super();
    
  }

  componentDidMount() {
/*     WeatherRequests.getCurrentCityPosition().then(position => {
      console.log(position)
      WeatherRequests.getCityInfo(position).then(res=> {
        console.log(res);
      });
    }); */

  }

  render() {
    return (
      <div className="App">
        <OtherCities ></OtherCities>
      </div>
    );
  }
}

export default App;
