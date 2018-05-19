import React, { Component } from 'react';
import './cityExtract.css';

function CityExtract({name, skyStatus, temperature}) {
    return (
        <a href="#" className="city-extract">
            <div>
                <header>
                    <h2>{name}</h2>
                </header>
                <img src="http://via.placeholder.com/50"/>
                <span className="temperature">{temperature}°</span>
            </div>
        </a>
    )
}

export default CityExtract;