import { combineReducers } from 'redux';
import _loadAppReducer from './loadAppReducer';
import _searchChangeReducer from './searchChangeReducer';
import _hourlySearchReducer from './hourlySearchReducer';
import _typeAheadReducer from './typeAheadReducer';
import _menuReducer from './menuReducer';
/**
 * rootReducer.js
 * 
 * @abstract combined base reducer with all individual actionType reducers
 * @author Chase
 */
const rootReducer = combineReducers( {
        loadApp : _loadAppReducer, 
   searchChange : _searchChangeReducer,
      typeAhead : _typeAheadReducer,
         hourly : _hourlySearchReducer,
           menu : _menuReducer
});

export default rootReducer;