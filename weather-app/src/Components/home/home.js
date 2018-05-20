import React, { Component } from "react";
import "./home.css";

//Services
import DayConditions from "../../Services/dayConditions";

// Components
import MainWeather from "../mainWeather/mainWeather";
import Forecast from "./forecast/forecast";
import MapCity from "./map/map";

class Home extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <section
        className={`main-container ${this.props.isDay ? "day" : "night"}`}
      >
        <MainWeather
          name={this.props.mainWeather.name}
          skyStatus={this.props.mainWeather.skyStatus}
          min={this.props.mainWeather.min}
          max={this.props.mainWeather.max}
        />
        <div className="container">
          <div className="half">
            {this.props.forecast.map((item, index) => {
              return (
                <Forecast
                  key={index}
                  date={{
                    ...item.date,
                    month: DayConditions.getMonthName(item.date.month)
                  }}
                  skyStatus={DayConditions.setWeatherSkyIcon(item.skyStatus)}
                  min={Math.floor(item.temp_min)}
                  max={Math.floor(item.temp_max)}
                />
              );
            })}
          </div>
          <div className="half">
            <MapCity position={this.props.position} />
          </div>
        </div>
      </section>
    );
  }
}

export default Home;
