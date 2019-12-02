import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import { LOAD_APP, SEARCH_CHANGE, 
         HOURLY_CLICK, TYPE_AHEAD_CHANGE,
         MENU_CLICK, MENU_LOCATION } from '../actions/actionTypes';
import AppContainer from './AppContainer';
import Home from '../pages/Home';
import About from '../pages/About';
import Alerts from '../pages/Alerts';
import NotFound from '../pages/NotFound';
/**
 * @abstract State to props mounting point for Weather App via redux store, 
 * API layer access is triggered via event handlers exposed here that dispatch
 * proper actions to the store - state is managed entirely via redux-sagas and
 * reflected back here via updated props which are pushed back down the tree
 * @author Chase
 */
class App extends Component {

    // handle app initialization
    componentDidMount() {
        
        // check for existing user action
        this.props._checkForExistingUser();
    }

    // SearchBar change event handler
    _handleSearchChange = (locationText) => {
	
        // search change action
        this.props._handleSearchChange(locationText);
    }

    // SearchBar type ahead event handler
    _handleSearchTypeAhead = (locationText) => {
	
        // search change action
        this.props._handleSearchTypeAhead(locationText);
    }

    // hourly event handler
    _handleHourlyClick = () => {
        
        // hourly search action
        this.props._handleHourlyClick();   
    }

    // handle menu touch/click
    _handleMenuClick = () => {

        this.props._handleMenuClick();
    }

    // my location touch/click
    _handleMyLocationClick = () => {

        this.props._handleMyLocationClick();
    }

    // render implementation, handles routing for each page component
    // to include shared menu bar across all pages
    render() {
		
        const { location, locationName, typeAheadRes, outlook, current, 
                hourly, alerts, showHourly, showMenu, showSpinner,
                hideForInit } = this.props;
        return (
            <div>
                <Router>
                    <AppContainer
                        hideForInit={hideForInit}
                        showSpinner={showSpinner} 
                        location={location}
                        showMenu={showMenu}
                        typeAheadRes={typeAheadRes}
                        onSearchChange={this._handleSearchChange}
                        onSearchTypeAhead={this._handleSearchTypeAhead}
                        onMenuClick={this._handleMenuClick}
                        onMyLocationClick={this._handleMyLocationClick}>
                        <Switch>
                            <Route exact path="/" 
                                render={(props) => 
                                    <Home {...props}
                                        location={location}
                                        locationName={locationName}
                                        outlook={outlook}
                                        current={current}
                                        hourly={hourly}
                                        showHourly={showHourly}
                                        onHourlyClick={this._handleHourlyClick}/>} 
                            />
                            <Route path="/about" component={About} />
                            <Route path="/alerts" 
                                   render={(props) => 
                                        <Alerts {...props}
                                            alerts={alerts}/>} />
                            <Route component={NotFound} />
                        </Switch>
                    </AppContainer>
                </Router>
            </div>
        );
    }
}
// mapStateToProps redux implementation
const mapStateToProps = (state) => ({
    location : state.searchChange.location,
locationName : state.searchChange.locationName,
     current : state.searchChange.current, 
     outlook : state.searchChange.outlook,
      hourly : state.searchChange.hourly,
      alerts : state.searchChange.alerts,
typeAheadRes : state.typeAhead.location,
  showHourly : state.hourly.show,
 showSpinner : state.loadApp.showSpinner,
    showMenu : state.menu.showMenu,
 hideForInit : state.loadApp.hideForInit,
       error : state.loadApp.error
});
// mapDispatchToProps redux implementaion, handles firing actions
// to the redux store for state update
const mapDispatchToProps = (dispatch) => {
    return {
        _checkForExistingUser : () => dispatch({
            type : LOAD_APP
        }),
        _handleSearchChange : (locationText) => dispatch({
            type : SEARCH_CHANGE,
         payload : locationText
        }),
        _handleSearchTypeAhead : (locationText) => dispatch({
            type : TYPE_AHEAD_CHANGE,
         payload : locationText
        }),
        _handleHourlyClick : () => dispatch({
            type : HOURLY_CLICK
        }),
        _handleMenuClick : () => dispatch({
            type : MENU_CLICK
        }),
        _handleMyLocationClick : () => dispatch({
            type : MENU_LOCATION
        })
    };
}

export default connect(mapStateToProps,mapDispatchToProps)(App);