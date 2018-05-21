import React, { Component } from 'react';
import './header.css';

//Components
import ToggleSystem from './toggleSystem/toggleSystem';

function Header({toggleSystem}) {
    return (
        <header className="main-header">
            <div/>
            <ToggleSystem onClick={toggleSystem} />
        </header>
    )
}

export default Header;