import React, { Component } from 'react';
import './searchContainer.css';

//Components

class SearchContainer extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <section className={`search-container ${(this.props.isOpen) ? '' : 'close'}`}>
                <header>
                    <h1>Search</h1>
                    <a onClick={this.props.close} className="fa fa-times"></a>
                </header>
                <div className='search-inputs'>
                    <input type="text" placeholder="City Name" />
                    <select placeholder="Country">
                        <option value="0">Country</option>
                        <option value="1">US</option>
                        <option value="2">MX</option>
                    </select>
                </div>
                <ul className="search-results">
                    <li><a >Monterrey </a></li>
                    <li><a >Monterrey </a></li>
                    <li><a >Monterrey </a></li>
                    <li><a >Monterrey </a></li>
                    <li><a >Monterrey </a></li>
                    <li><a >Monterrey </a></li>
                    <li><a >Monterrey </a></li>
                    <li><a >Monterrey </a></li>
                    <li><a >Monterrey </a></li>
                    <li><a >Monterrey </a></li>
                    <li><a >Monterrey </a></li>
                    <li><a >Monterrey </a></li>
                    <li><a >Monterrey </a></li>
                    <li><a >Monterrey </a></li>
                    <li><a >Monterrey </a></li>
                    <li><a >Monterrey </a></li>
                    <li><a >Monterrey </a></li>
                    <li><a >Monterrey </a></li>
                    <li><a >Monterrey </a></li>
                    <li><a >Monterrey </a></li>
                    <li><a >Monterrey </a></li>
                    <li><a >Monterrey </a></li>
                    <li><a >Monterrey </a></li>
                    <li><a >Monterrey </a></li>
                    <li><a >Monterrey </a></li>
                </ul>
            </section>
        )
    }
}

export default SearchContainer;