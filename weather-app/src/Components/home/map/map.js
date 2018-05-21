import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';

import env from '../../../Services/enviroment';

import './map.css';

class MapCity extends Component {
    static defaultProps  = {
        position: {
            lat: 0,
            lng: 0
        },
        zoom: 11
    }

    constructor(props) {
        super(props);

        this.state = {
            position: this.props.position,
            zoom: this.props.zoom
        };
    }

    componentWillUpdate() {
        if (this.isPositionFilled(this.props.position) && this.props.position !== this.state.position) {
            this.setState({
                position: this.props.position,
                zoom: this.props.zoom
            });
        }
    }

    render() {
        return (
            <section className="map">
                {
                    this.displayMap()
                }
            </section>
        );
    }
    
    displayMap() {
        if (this.isPositionFilled(this.state.position)) {
            return <GoogleMapReact
                    bootstrapURLKeys={{ key: env.googleLocationKey }}
                    center={this.state.position}
                    defaultZoom={this.state.zoom}
                    />
        }
    }

    isPositionFilled(val) {
        return (val.lat !== 0 && val.lng !== 0)
    }
}

export default MapCity;
