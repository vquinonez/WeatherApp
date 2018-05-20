import React, { Component } from 'react';
import './cityExtract.css';

function CityExtract({name, skyStatus, temperature, onClick}) {
    return (
        <a href="#" className="city-extract" name={name} onClick={onClick}>
            <div name={name}>
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