import React, { Component } from 'react';
import './forecast.css';

// Components
function Forecast({date = {month: '', day: 0}, skyStatus, min, max}) {
    return (
        <section className="forecast">
            <div className="date">
                <span>{date.month}</span>
                <h2>{date.day}</h2>
            </div>
            <img src={`${process.env.PUBLIC_URL}/icons${skyStatus}`} />
            <div className="info">
                <h3>{min}° <span>MIN</span></h3>
                <h3>{max}° <span>MIN</span></h3>
            </div>
        </section>
    );
}

export default Forecast;
