import React, { Component } from 'react';
import './home.css';

// Components
import MainWeather  from '../mainWeather/mainWeather'

class Home extends Component {

  constructor() {
    super();
    
  }

  render() {
    return (
      <div className="main-container">
        <MainWeather />
        asd
      </div>
    );
  }
}

export default Home;
