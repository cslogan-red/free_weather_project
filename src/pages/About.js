import React, { Component } from 'react';
import './About.scss';
import Icon from '../icons/Icon';
import constants from '../constants';

/**
 * @abstract About page component, represents simple about page, mounted via App.js
 * @author Chase
 */
class About extends Component {

    // render implementation
    render() {

        const about = constants.about;
        return (
            <div>
                <div className="about__container">
                    <div className="about__content">
                        <div>
                            <Icon className="about__icon" 
                                  name="clear-day" fill="#FFF" />
                        </div>
                        <p>
                            <label>{about.slogan}</label>
                        </p>
                        <p>
                            <label>
                                {about.repo}<a href="https://github.com/cslogan-red/free_weather_project/" 
                                               rel="noopener noreferrer" 
                                               target="_blank">{about.appTitle}
                                            </a>
                            </label>
                        </p>
                        <p>
                            {about.credit}<a href="https://darksky.net/poweredby/"
                                              rel="noopener noreferrer"
                                              target="_blank">{about.api}
                                          </a>
                            {about.credit2}<a href="http://adamwhitcroft.com/climacons/"
                                              rel="noopener noreferrer"
                                              target="_blank">{about.icons}
                                          </a>{about.credit3}
                        </p>
                        <div className="about__content--footer">
                            <p>{about.disclaimer}</p>
                            <p>{about.copyright}</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default About;