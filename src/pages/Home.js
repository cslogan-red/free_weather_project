import React, { Component } from 'react';
import './Home.css';
import CurrentCondtions from '../components/CurrentConditions';
import SevenDayOutlook from '../components/SevenDayOutlook';
/**
 * @abstract Home page component, represents home landing page, mounted via App.js
 * @author Chase
 */
class Home extends Component {

    // render implementation
    render() {
		
        const { location, locationName, outlook, current, 
                hourly, showHourly } = this.props;
        return (
            <div>
                { locationName ? (
                    <div className="home__weather--container">
                        <CurrentCondtions 
                            location={location}
                            locationName={locationName}
                            current={current}
                            showHourly={showHourly}
                            hourly={hourly}
                            onHourlyClick={this.props.onHourlyClick} />
                        <SevenDayOutlook 
                            outlook={outlook} />
                    </div>
                ) : (
                    <div className="home__search--label">
                        <label>Search for a location!</label>
                        <div>
                            <label>(Pro tip: allow location access)</label>
                        </div>
                    </div>
                ) }
            </div>
        );
    }
}

export default Home;