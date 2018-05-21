import React, { Component } from 'react';
import './search.css';

//Components
import SearchContainer from './searchContainer/searchContainer'

class Search extends Component {

    constructor(props) {
        super(props);

        this.state = {
            openSearch: false
        }
    }

    render() {
        return (
            <div className="search">
                <button onClick={this.toggleSearch.bind(this)}><i className="fa fa-search"/> Search</button>
                {/* {this.displaySearch()} */}
                <SearchContainer isOpen={this.state.openSearch} close={this.toggleSearch.bind(this)} />
            </div>
        )
    }

    displaySearch() {
        if (this.state.openSearch) {
            return (<SearchContainer isOpen={this.state.openSearch} close={this.toggleSearch.bind(this)} />);
        }
    }

    toggleSearch() {
        this.setState({
            openSearch: !this.state.openSearch
        })
    }
}

export default Search;