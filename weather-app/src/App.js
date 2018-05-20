import React, { Component } from 'react';
import './App.css';

// Components
import Home from './Components/home/home';
import OtherCities from './Components/otherCities/otherCities';

class App extends Component {

  constructor() {
    super();
    
    this.state ={
      selectedCity: null
    };
  }

  render() {
    return (
      <div className="App">
        <Home/>
        <OtherCities onClick={this.catchClickEvent.bind(this)}/>
      </div>
    );
  }

  catchClickEvent(e) {
    this.setState({selectedCity: e.currentTarget.getAttribute('name')})
  }

}

export default App;
