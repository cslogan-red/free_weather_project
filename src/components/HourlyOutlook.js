import React, { Component } from 'react';
import './HourlyOutlook.scss';
import Icon from '../icons/Icon';

class HourlyOutlook extends Component {

    // render implementation
    render() {

        const { icon, hour, temp, precip } = this.props;
        return (
            <div className="hourly__wrapper">
                <div className="hourly__container">
                    <div className="hourly__detail">
                        <Icon name={icon} width={50} fill="#0da6ff" />
                    </div>
                    <div className="hourly__detail">
                        <span>{hour}</span>
                    </div>
                    <div className="hourly__detail">
                        <span>{temp}</span>
                    </div>
                    <div className="hourly__detail">
                        <Icon name={"rain"} width={50} fill="#0da6ff" />
                        <span>{precip}%</span>
                    </div>
                </div>
            </div>
        );
    }
}

export default HourlyOutlook;