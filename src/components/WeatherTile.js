import React, { Component } from 'react';
import './WeatherTile.scss';
import Icon from '../icons/Icon';

class WeatherTile extends Component {

    // render implementation
    render() {

        const date = this.props.conditions ? this.props.conditions.date : '',
          tempHigh = this.props.conditions ? this.props.conditions.tempHigh : '',
           tempLow = this.props.conditions ? this.props.conditions.tempLow : '',
           summary = this.props.conditions ? this.props.conditions.summary : '',
              icon = this.props.conditions ? this.props.conditions.icon : '',
       sunriseTime = this.props.conditions ? this.props.conditions.sunriseTime : '',
        sunsetTime = this.props.conditions ? this.props.conditions.sunsetTime : '';
        return(
            <div>
                <div className="tile__wrapper">
                    <div className="tile__container">
                        <div className="tile__header">
                            <span>{date}</span>
                        </div>
                        <div className="tile__detail">
                            <span><Icon name={"up"} width={15} fill="#0da6ff" /> {tempHigh}</span>
                            <span><Icon name={"down"} width={15} fill="#0da6ff" /> {tempLow}</span>
                            <div>{summary}</div>
                            { sunriseTime ? (
                                <div className="tile__rise--container">
                                    <Icon name="sunrise" width={60} fill="#0da6ff" />
                                    <label>{sunriseTime}</label>
                                    <Icon name="sunset" width={60} fill="#0da6ff" />
                                    <label>{sunsetTime}</label>
                                </div>
                            ) : ''}
                        </div>
                    </div>
                    <div className="tile__img--container">
                        <Icon name={icon} width={100} fill="#0da6ff" />
                    </div>
                </div>
            </div>
        );
    }
}

export default WeatherTile;