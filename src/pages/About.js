import React, { Component } from 'react';
import './About.css';
import Icon from '../icons/Icon';
/**
 * @abstract About page component, represents simple about page, mounted via App.js
 * @author Chase
 */
class About extends Component {

    // render implementation
    render() {

        return (
            <div>
                <div className="about__container">
                    <div className="about__content">
                        <div>
                            <Icon className="about__icon" 
                                name="clear-day" fill="#FFF" />
                        </div>
                        <p>
                            <label>No ads, no drama, it's just free weather.</label>
                        </p>
                        <p>
                            <label>
                                Check out our repo, 
                                    <a href="https://github.com/cslogan-red/free_weather_project/"
                                       rel="noopener noreferrer"
                                       target="_blank">Free Weather Project</a>
                            </label>
                        </p>
                        <p>
                            Credit to
                                <a href="https://darksky.net/poweredby/"
                                    rel="noopener noreferrer"
                                    target="_blank">Dark Sky's API</a>for the weather service,
                                and to
                                <a href="http://adamwhitcroft.com/climacons/"
                                    rel="noopener noreferrer"
                                    target="_blank">@adamwhitcroft</a>for the great icons.
                        </p>
                        <div className="about__content--footer">
                            <p>
                                Disclaimer: This site uses cookies, if you allow location access,
                                it offers you weather in your current location. We DO NOT solicit 
                                any of the anonymous location data collected to ANYONE, it's used
                                solely for providing the weather. Free Weather Project is meant to 
                                be totally free, no ads, no drama, it's just free weather!
                            </p>
                            <p>Copyright (c) 2019 Chase@FreeWeatherProject</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default About;