import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import './SearchBar.css';
import LoadingSpinner from './LoadingSpinner';
import Icon from '../icons/Icon';

class SearchBar extends Component {

    componentWillMount() {
        this.timeout = null;
    }

    // handle enter key press
    _handleSearchKeyPress = async (e) => {
        
        if (e.key === 'Enter')  {
            const INPUT = e.target
            await this.props.onSearchChange(INPUT.value);
            INPUT.value = '';
            this.props.history.push('/');
        }
    }

    // handle type ahead search trigger on key up
    _handleKeyUp = async (e) => {
        
        const WAIT_INTERVAL = 500;
        let val = e.target.value;
        clearTimeout(this.timeout);
        // ignore search on delete/backspace, on enter or less than 2 chars
        if (e.keyCode === 8) {
            this.timeout = 
                setTimeout(this.props.onTypeAhead, WAIT_INTERVAL, '');
        } else if (e.key !== 'Enter' && val && val.trim().length >= 2) {
            this.timeout = 
                setTimeout(this.props.onTypeAhead, WAIT_INTERVAL, e.target.value);
        } else if (!val || e.keyCode === undefined) {
            val = '';
            this.timeout = 
                setTimeout(this.props.onTypeAhead, WAIT_INTERVAL, '');
        }
        
    }

    // search result click/touch handler
    _handleResultClick = async () => {
        
        const INPUT = document.getElementById("searchResult"),
          INPUT_VAL = document.getElementById("searchInput");
        await this.props.onSearchChange(INPUT.innerText);
        INPUT_VAL.value = '';
        this.props.history.push('/');
    }

    // menu click/touch handler
    _handleMenuClick = () => {

        this.props.onMenuClick();
    }

    // render implementation
    render() {

        const { showSpinner, showMenu, typeAheadRes } = this.props;
        return(
            <div>
                <div className="search__container">
                    <div className="search__icon--container">
                        <Icon className="search__icon" name="search" 
                              fill="#808080" />
                        <input id="searchInput" alt="Search" 
                               placeholder="Enter a location..."
                               onKeyPress={this._handleSearchKeyPress}
                               onKeyUp={this._handleKeyUp} />
                    </div>
                    <div className="search__spinner--wrapper">
                        <LoadingSpinner showSpinner={showSpinner} />
                    </div>
                    <div className="search__icon--menu-container" 
                         onClick={this._handleMenuClick}>
                         { showMenu ? (
                             <Icon className="search__icon--menu" name="close"
                                   fill="#808080" />
                         ) : (
                            <Icon className="search__icon--menu" name="menu"
                                  fill="#808080" />
                         )}
                    </div>
                </div>
                { typeAheadRes ? (
                    <div className="search__result--container">
                        <div className="search__result" 
                             onClick={this._handleResultClick}>
                             <Icon className="search__icon" name="search" 
                                   fill="#000" />
                            <div id="searchResult">{typeAheadRes}</div>
                        </div>
                    </div>
                ) : ''}
            </div>
        );
    }
}

export default withRouter(SearchBar);