import React, { Component } from 'react';
import './rainAlert.css';

// Components
function RainAlert({close}) {
    
    return (
        <section className="rain-alert">
            <header>
                <h1>Warning</h1>
                <a onClick={close}><i className="fa fa-times" /></a>
            </header>
            <div className="alert-body">
                <img src={`${process.env.PUBLIC_URL}/icons/dark/rain.png`} />
                <h2>Exist a chance of rain at this place</h2>
            </div>
        </section>
    );
}

export default RainAlert;
