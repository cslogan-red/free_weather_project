import React, { Component } from 'react';
import './SevenDayOutlook.scss';
import WeatherTile from './WeatherTile';
import constants from '../constants';

class SevenDayOutlook extends Component {

    // render implementation
    render() {

        const outlook = this.props.outlook ? this.props.outlook : [];
        return(
            <div>
                { outlook && outlook.length ? (
                    <div className="seven-day__container">
                        <div className="seven-day__header--label">
                            <span>{constants.outlook.title}</span>
                        </div>
                        <div className="seven-day__tile--container">
                            {outlook.map((conditions, i) => 
                                i > 1 && <WeatherTile conditions={conditions} key={i} />)}
                        </div>
                    </div>
                ) : ('') }
            </div>
        );
    }
}

export default SevenDayOutlook;