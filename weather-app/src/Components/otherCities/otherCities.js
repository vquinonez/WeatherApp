import React, { Component } from 'react';
import './otherCities.css';

// Components
import CitieExtract from './cityExtract/cityExtract'

function OtherCities() {
    return (
        <footer>
            <header>
                <h1>Other Cities</h1>
            </header>
            <div className="cities-list">
                <CitieExtract name="Seattle" temperature="10"/>
                <CitieExtract name="Seattle" temperature="10"/>
                <CitieExtract name="Seattle" temperature="10"/>
                <CitieExtract name="Seattle" temperature="10"/>
                <CitieExtract name="Seattle" temperature="10"/>
                <CitieExtract name="Seattle" temperature="10"/>
                <CitieExtract name="Seattle" temperature="10"/>
                <CitieExtract name="Seattle" temperature="10"/>
                <CitieExtract name="Seattle" temperature="10"/>
                <CitieExtract name="Seattle" temperature="10"/>
            </div>
            
        </footer>
    )
}

export default OtherCities;