import React, { Component } from 'react';
import './CurrentConditions.css';
import HourlyOutlook from './HourlyOutlook';
import Icon from '../icons/Icon';
import { CSSTransitionGroup } from 'react-transition-group';
import constants from '../constants';

class CurrentConditions extends Component {

    constructor( props) {
        
        super( props);
        this._handleCurrentClick = this._handleCurrentClick.bind( this);
    }
    
    // right now click/touch event handler, managed via parent
    _handleCurrentClick() {
        
        this.props.onHourlyClick();
    }

    // render implementation
    render() {
        
        const { location, current, locationName,
                hourly, showHourly } = this.props;
        const currentConditions = constants.currentConditions;
        return(
            <div>
                { location ? (
                    <div className="current__container" onClick={this._handleCurrentClick}>
                        <div className="current__header--label">
                            <span>{locationName}</span>
                        </div>
                        <div className="current__rightNow">
                            <div className="current__rightNow--label">{currentConditions.rightNow}</div>
                            <div className="current__rightNow--flex">
                                <div>
                                    <div>{current.summary}, {current.temp}</div>
                                    <div><span>{currentConditions.feelsLike} {current.feelsLikeTemp})</span></div>
                                    <div>{currentConditions.humidity} {current.humidity}%</div>
                                    <div>{currentConditions.wind} {current.windSpeed}{currentConditions.mph}</div>
                                </div>
                                <div>
                                    <Icon name={current.icon} width={100} fill="#FFF" />
                                </div>
                            </div>
                            { current.sunriseTime ? (
                                <div className="current__rise--container">
                                    <Icon name="sunrise" width={60} fill="#FFF" />
                                    <label>{current.sunriseTime}</label>
                                    <Icon name="sunset" width={60} fill="#FFF" />
                                    <label>{current.sunsetTime}</label>
                                </div>
                            ) : ''}
                        </div>
                        <CSSTransitionGroup
                            transitionName="current__hourly"
                            transitionAppear={true}
                            transitionAppearTimeout={500}
                            transitionEnterTimeout={500}
                            transitionLeaveTimeout={300}>
                                { showHourly ? (
                                    <div className="current__hourly--wrapper" key={"hourlyWrapper"}>
                                        {hourly.map( (item, i) => 
                                            <HourlyOutlook 
                                                key={i} 
                                                icon={item.icon} 
                                                hour={item.time} 
                                                temp={item.temp}
                                                precip={item.precip}/>)}
                                    </div>
                                ) : ('')}
                        </CSSTransitionGroup>
                    </div>
                ) : ('')}
            </div>
        );
    }
}

export default CurrentConditions;