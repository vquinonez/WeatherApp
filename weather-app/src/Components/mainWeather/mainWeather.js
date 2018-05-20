import React, { Component } from 'react';
import './mainWeather.css';

// Components
function MainWeather({name, skyStatus, min, max}) {
    return (
      <header className="main-weather">
        <h1>{name}</h1>
        <img src={`${process.env.PUBLIC_URL}/icons${skyStatus}`} />
        <div className="temperature">
            <span>MIN</span> <h3>{min}°</h3>
            <span>Max</span> <h3>{max}°</h3>
        </div>
      </header>
    );
}

export default MainWeather;
