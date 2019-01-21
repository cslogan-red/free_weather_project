import { race, call, put } from 'redux-saga/effects';
import { delay } from 'redux-saga';
import DataService from '../services/DataService';
import { SEARCH_CHANGE, SEARCH_CHANGE_SUCCESS, 
        SEARCH_CHANGE_INIT, LOAD_APP_SUCCESS } from '../actions/actionTypes';
import LocationService from '../services/LocationService';
/**
 * loadAppSaga.js
 * 
 * @abstract saga represents initial app load, store init
 * @author Chase
 */
export function* _loadApp() {

    try {
        // lookup device Id and device document, request device location
        const USER_KEY = yield call( new DataService()._getUserIdAsync);
        const USER_DOC = yield call( new DataService()._getDocument, USER_KEY),
           EXP_SESSION = 300000;
        const { USER_LOC, USER_LOC_TIMEOUT } = yield race({ 
                    USER_LOC : call( new LocationService()._getClientLocation),
            USER_LOC_TIMEOUT : call( delay, 15000)
        });
           
        if ( USER_DOC && USER_DOC.location) { 
            // if cached data exists, check if session has expired, if expired, search
            // on users current device location if available, else fallback to last stored
            if ( USER_DOC.timeStamp && Date.now() - USER_DOC.timeStamp > EXP_SESSION) {
                yield put( { type : SEARCH_CHANGE, 
                          payload : USER_LOC ? USER_LOC.lat + ',' + USER_LOC.lng : USER_DOC.location });
            } else {
                yield put( { type : SEARCH_CHANGE_SUCCESS, 
                          payload : _buildCacheResult( USER_DOC) });
                yield put( { type : LOAD_APP_SUCCESS });
            }
        } else {
            // re-init the app in this case
            if ( USER_LOC) {
                yield put( { type : SEARCH_CHANGE, 
                          payload : USER_LOC.lat + ',' + USER_LOC.lng });
            } else if ( USER_LOC_TIMEOUT || !USER_LOC) {
                yield put( { type : LOAD_APP_SUCCESS });
                yield put( { type : SEARCH_CHANGE_INIT });
            }
        }
    } catch ( error) {
        // re-init the app in this case
        yield put( { type : LOAD_APP_SUCCESS });
        yield put( { type : SEARCH_CHANGE_INIT });
    }
}

// construct state from cache
const _buildCacheResult = ( cacheObj) => {
    let retObj = {};

    if ( cacheObj) {
        retObj = {
            location : cacheObj.location,
        locationName : cacheObj.locationName,
           timeStamp : cacheObj.timeStamp,
             current : cacheObj.current,
             outlook : cacheObj.outlook,
              hourly : cacheObj.hourly,
              alerts : cacheObj.alerts
        }
    }
    return retObj;
}