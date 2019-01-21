import React, { Component } from 'react';
import './WeatherAlert.css';

class WeatherAlert extends Component {

    // render implementation
    render() {

        const    expires = this.props.alert ? this.props.alert.expires : '',
             description = this.props.alert ? this.props.alert.description : '',
                severity = this.props.alert ? this.props.alert.severity : '',
                   title = this.props.alert ? this.props.alert.title : '';
        return(
            <div>
                <div className="alert__wrapper">
                    <div className="alert__container">
                        <div className="alert__header">
                            <span>{title}</span>
                        </div>
                        <div className="alert__detail">
                            <div><span>Expires: {expires}</span></div>
                            <div><span>Severity: {severity}</span></div>
                            <p>
                                <label>{description}</label>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default WeatherAlert;