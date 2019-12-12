import React, { Component } from 'react';
import './AppContainer.scss';
import LoadingSpinner from './LoadingSpinner';
import SearchBar from './SearchBar';
import Menu from './Menu';

class AppContainer extends Component {

    // render implementation
    render() {
        
        const { hideForInit, showSpinner, location, 
                showMenu, typeAheadRes } = this.props;
        return (
            <div>
                { hideForInit ? (
                    <div className="app__container">
                        <div className="app__loading--container">
                            <LoadingSpinner showSpinner={showSpinner} />
                        </div>
                    </div>
                ) : (
                    <div className="app__container">
                        <div className="app__fixed--menu">
                            <SearchBar
                                showSpinner={showSpinner}
                                location={location}
                                onSearchChange={this.props.onSearchChange}
                                onTypeAhead={this.props.onSearchTypeAhead}
                                typeAheadRes={typeAheadRes}
                                showMenu={showMenu}
                                onMenuClick={this.props.onMenuClick} />
                        </div>
                        <Menu showMenu={showMenu} key={"app__menu"}
                              onMyLocation={this.props.onMyLocationClick}
                              onMenuClick={this.props.onMenuClick} />
                        
                        <div onClick={() => showMenu && this.props.onMenuClick()}>
                            {this.props.children}
                        </div>
                    </div>
                ) }
            </div>
        );
    }
}

export default AppContainer;