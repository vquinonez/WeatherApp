import React, { Component } from 'react';
import './App.css';

// Components
import Home from './Components/home/home';
import OtherCities from './Components/otherCities/otherCities';

class App extends Component {

  constructor() {
    super();
    
  }

  render() {
    return (
      <div className="App">
        <Home/>
        <OtherCities/>
      </div>
    );
  }
}

export default App;
