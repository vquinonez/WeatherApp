import React, { Component } from 'react';
import './cityExtract.css';

function CityExtract({name, skyStatus, temperature}) {
    return (
        <a href="#" className="city-extract">
            <div>
                <header>
                    <h2>{name}</h2>
                </header>
                <img src={(skyStatus) ? `${process.env.PUBLIC_URL}/icons${skyStatus}` : `http://via.placeholder.com/50?text=No+data`}/>
                <span className="temperature">{temperature}°</span>
            </div>
        </a>
    )
}

export default CityExtract;