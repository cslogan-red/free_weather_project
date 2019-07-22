import React, { Component } from 'react';
import './Tomorrow.css';
import WeatherTile from './WeatherTile';
import HourlyOutlook from './HourlyOutlook';
import { CSSTransitionGroup } from 'react-transition-group';
import constants from '../constants';

class Tomorrow extends Component {

    constructor(props) {
        super(props);
        this.state = {
            showHourly: false
        };
        this._handleTomorrowClick = this._handleTomorrowClick.bind( this);
    }

    _handleTomorrowClick = () => {
        this.setState({ showHourly: !this.state.showHourly });
    }

    // render implementation
    render() {

        const { conditions, hourly } = this.props;
        const showHourly = this.state.showHourly;
        return(
            <div>
                {conditions && 
                    <div className="tomorrow__container" onClick={this._handleTomorrowClick}>
                        <div className="tomorrow__header--label">
                            <span>{constants.tomorrow.title}</span>
                        </div>
                        <div className="tomorrow__tile--container">
                            <WeatherTile conditions={conditions} />
                        </div>
                        {hourly && hourly.length > 0 &&
                            <CSSTransitionGroup
                                transitionName="current__hourly"
                                transitionAppear={true}
                                transitionAppearTimeout={500}
                                transitionEnterTimeout={500}
                                transitionLeaveTimeout={300}>
                                    {showHourly && hourly &&
                                        <div className="current__hourly--wrapper" key={"hourlyWrapper"}>
                                            {hourly.map( (item, i) => 
                                                <HourlyOutlook 
                                                    key={i} 
                                                    icon={item.icon} 
                                                    hour={item.time} 
                                                    temp={item.temp}
                                                    precip={item.precip}/>)}
                                        </div>
                                    }
                            </CSSTransitionGroup>
                        }
                    </div>
                }
            </div>
        );
    }
}

export default Tomorrow;