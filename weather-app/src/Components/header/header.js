import React, { Component } from 'react';
import './header.css';

//Components
import ToggleSystem from './toggleSystem/toggleSystem';
import Search from './search/search';

function Header({toggleSystem, selectedElem}) {
    return (
        <header className="main-header">
            <Search selectedElem={selectedElem}/>
            <ToggleSystem onClick={toggleSystem} />
        </header>
    )
}

export default Header;