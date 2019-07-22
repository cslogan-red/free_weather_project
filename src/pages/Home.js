import React, { Component } from 'react';
import './Home.css';
import CurrentCondtions from '../components/CurrentConditions';
import SevenDayOutlook from '../components/SevenDayOutlook';
import Tomorrow from '../components/Tomorrow';
import constants from '../constants';

/**
 * @abstract Home page component, represents home landing page, mounted via App.js
 * @author Chase
 */
class Home extends Component {

    // render implementation
    render() {
		
        const { location, locationName, outlook, current, 
                hourly, showHourly } = this.props;
        const home = constants.home;
        return (
            <div>
                { locationName ? (
                    <div className="home__weather--container">
                        <CurrentCondtions 
                            location={location}
                            locationName={locationName}
                            current={current}
                            showHourly={showHourly}
                            hourly={this.splitHourly(hourly).firstDay}
                            onHourlyClick={this.props.onHourlyClick} 
                        />
                        <Tomorrow 
                            conditions={outlook && outlook.length >= 1 && outlook[1]} 
                            hourly={this.splitHourly(hourly).secondDay}
                        />
                        <SevenDayOutlook 
                            outlook={outlook}
                        />
                    </div>
                ) : (
                    <div className="home__search--label">
                        <label>{home.search}</label>
                        <div>
                            <label>{home.tip}</label>
                        </div>
                    </div>
                ) }
            </div>
        );
    }
    
    splitHourly = (hourly) => {
        const retVal = { firstDay: [], secondDay: [] };
        const dayDelimiter = '6AM';
        let i = 0;
        if (hourly && hourly.length > 0) {
            while (i < hourly.length) {
                if (hourly[i] && hourly[i].time !== dayDelimiter) {
                    retVal.firstDay.push(hourly[i]);
                    i++;
                } else {
                    retVal.firstDay.push(hourly[i]);
                    retVal.secondDay.push(...[hourly[i-6], hourly[i-5], hourly[i-4], hourly[i-3], hourly[i-2], hourly[i-1], hourly[i]]);
                    i++;
                    while (i < hourly.length) {
                        if (hourly[i] && hourly[i].time !== dayDelimiter) {
                            retVal.secondDay.push(hourly[i]);
                            i++;
                        } else {
                            retVal.secondDay.push(hourly[i]);
                            i = hourly.length;
                        }
                    }
                }
            }
        }
        return retVal;
    }
}

export default Home;