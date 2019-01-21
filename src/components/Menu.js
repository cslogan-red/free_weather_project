import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Menu.css';
import Icon from '../icons/Icon';
import { CSSTransitionGroup } from 'react-transition-group';

class Menu extends Component {

    constructor( props) {

        super( props);
        this._handleMyLocationClick = this._handleMyLocationClick.bind( this);
    }

    // my location click/touch handler
    _handleMyLocationClick() {

        this.props.onMyLocation();
    }
 
    // render implementation
    render() {

        const { showMenu } = this.props;
        return (
            <div >
                <CSSTransitionGroup
                    transitionName="menu"
                    transitionAppear={true}
                    transitionAppearTimeout={500}
                    transitionEnterTimeout={500}
                    transitionLeaveTimeout={300}>
                    { showMenu ? (
                        <div className="menu__wrapper" key={"menuWrapper"}>
                            <div className="menu__content">
                                <div className="menu__header">
                                    Free Weather Project
                                </div>
                                <div className="menu__content--nav">
                                    <Link to="/" className="menu__content--link">
                                        <div onClick={this._handleMyLocationClick}>
                                            <label>My Location</label>
                                        </div>
                                    </Link>
                                    <Link to="/" className="menu__content--link">
                                        <div onClick={this.props.onMenuClick}>
                                            <label>Home</label>
                                        </div>
                                    </Link>
                                    <Link to="/alerts" className="menu__content--link">
                                        <div onClick={this.props.onMenuClick}>
                                            <label>Active Alerts</label>
                                        </div>
                                    </Link>
                                    <Link to="/about" className="menu__content--link">
                                        <div onClick={this.props.onMenuClick}>
                                            <label>About</label>
                                        </div>
                                    </Link>
                                </div>
                                <div className="menu__footer">
                                    <div>
                                        <Icon className="menu__icon--powered-by" 
                                              name="partly-cloudy-night" fill="#13306d" />
                                        <a href="https://darksky.net/poweredby/"
                                           rel="noopener noreferrer"
                                           target="_blank">Powered by DarkSky</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ): ''}
                </CSSTransitionGroup>
            </div>
        );
    }
}

export default Menu;