import { all, takeEvery } from 'redux-saga/effects';
import { _loadApp } from './loadAppSaga';
import { _searchChange } from './searchChangeSaga';
import { _hourlyClick } from './hourlySearchSaga';
import { _typeAheadSearch } from './typeAheadSaga';
import { _menuClick, _menuLocation } from './menuSaga';
import { LOAD_APP, SEARCH_CHANGE, TYPE_AHEAD_CHANGE, 
         MENU_CLICK, MENU_LOCATION, HOURLY_CLICK } from '../actions/actionTypes';
/**
 * @abstract root saga to be bound to saga middleware, watching for any of the specified
 * actionType's to be dispatched to the store
 * 
 * @author Chase
 */
export function* rootSaga() {
    
    yield all([
        takeEvery( LOAD_APP, _loadApp),
        takeEvery( SEARCH_CHANGE, _searchChange),
        takeEvery( TYPE_AHEAD_CHANGE, _typeAheadSearch),
        takeEvery( HOURLY_CLICK, _hourlyClick),
        takeEvery( MENU_CLICK, _menuClick),
        takeEvery( MENU_LOCATION, _menuLocation)
    ]);
}

export default rootSaga;