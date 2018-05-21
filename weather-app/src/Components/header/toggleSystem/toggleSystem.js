import React, { Component } from 'react';
import './toggleSystem.css';

function ToggleSystem({onClick}) {
    return (
        <div>
            <label className="switch">
                <input type="checkbox" onChange={onClick} />
                <span className="slider round"></span>
            </label>
        </div>
    )
}

export default ToggleSystem;