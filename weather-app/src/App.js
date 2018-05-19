import React, { Component } from 'react';
import './App.css';

// Components

import OtherCities from './Components/otherCities/otherCities'

class App extends Component {
  render() {
    return (
      <div className="App">
        <OtherCities></OtherCities>
      </div>
    );
  }
}

export default App;
