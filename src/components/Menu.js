import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Menu.scss';
import Icon from '../icons/Icon';
import { CSSTransitionGroup } from 'react-transition-group';
import constants from '../constants';

class Menu extends Component {

    // my location click/touch handler
    _handleMyLocationClick = () => {

        this.props.onMyLocation();
    }
 
    // render implementation
    render() {

        const { showMenu } = this.props;
        const menu = constants.menu;
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
                                    {menu.title}
                                </div>
                                <div className="menu__content--nav">
                                    <Link to="/" className="menu__content--link">
                                        <div onClick={this._handleMyLocationClick}>
                                            <label>{menu.myLoc}</label>
                                        </div>
                                    </Link>
                                    <Link to="/" className="menu__content--link">
                                        <div onClick={this.props.onMenuClick}>
                                            <label>{menu.home}</label>
                                        </div>
                                    </Link>
                                    <Link to="/alerts" className="menu__content--link">
                                        <div onClick={this.props.onMenuClick}>
                                            <label>{menu.alerts}</label>
                                        </div>
                                    </Link>
                                    <Link to="/about" className="menu__content--link">
                                        <div onClick={this.props.onMenuClick}>
                                            <label>{menu.about}</label>
                                        </div>
                                    </Link>
                                </div>
                                <div className="menu__footer">
                                    <div>
                                        <Icon className="menu__icon--powered-by" 
                                              name="partly-cloudy-night" fill="#13306d" />
                                        <a href={menu.poweredByUrl}
                                           rel="noopener noreferrer"
                                           target="_blank">{menu.poweredBy}</a>
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