import React, { Component } from 'react';
import './NotFound.css';
import constants from '../constants';

/**
 * @abstract 404 page component, mounted via App.js
 * @author Chase
 */
class NotFound extends Component {

    // render implementation
    render() {

        return (
            <div>
                <div className="not-found__label">
                    {constants.notFound}
                </div>
            </div>
        );
    }
}

export default NotFound;