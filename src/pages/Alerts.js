import React, { Component } from 'react';
import './Alerts.css';
import WeatherAlert from '../components/WeatherAlert';
/**
 * @abstract Alerts page component, represents alerts landing page, mounted via App.js
 * @author Chase
 */
class Alerts extends Component {

    // render implementation
    render() {

        const alerts = this.props.alerts ? this.props.alerts : [];
        return(
            <div>
                { alerts && alerts.length ? (
                    <div className="alerts__container">
                        <div className="alerts__header--label">
                            <span>Active Alerts</span>
                        </div>
                        <div className="alerts__tile--container">
                            {alerts.map( (alert, i) => 
                                <WeatherAlert alert={alert} key={i} />)}
                        </div>
                    </div>
                ) : (
                    <div className="alerts__none--label">
                        There are no active alerts.
                    </div>
                ) }
            </div>
        );
    }
}

export default Alerts;