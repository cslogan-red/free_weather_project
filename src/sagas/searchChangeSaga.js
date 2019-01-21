import { call, put, select } from 'redux-saga/effects';
import LocationService from '../services/LocationService';
import WeatherService from '../services/WeatherService';
import DataService from '../services/DataService';
import {  SEARCH_CHANGE_SUCCESS, SEARCH_CHANGE_INIT,
          LOAD_APP_SUCCESS, LOAD_APP_REQ,
          TYPE_AHEAD_CHANGE_INIT, HOURLY_HIDE } from '../actions/actionTypes';
/**
 * searchChangeSaga.js
 * 
 * @abstract saga represents a triggered search
 * @author Chase
 */

const _getLocation = state => state.searchChange.location;

 // lookup geocoords based on current state location, retrieve weather details
export function* _searchChange() {

    try {
        yield put( { type : LOAD_APP_REQ});
        yield put( { type : HOURLY_HIDE});
        const LOC = yield select( _getLocation);
        if ( LOC && LOC !== '') {
            const USER_KEY = yield call( new DataService()._getUserIdAsync);
            const GEO = yield call( new LocationService()._geocodeLocationAsync, LOC);
            const WEATHER = yield call( new WeatherService()._getWeatherResultAsync, GEO.lat, GEO.lng);
            const SEARCH_OBJ = {
                locationText : LOC,
                locationName : GEO.formattedAddr,
                     weather : WEATHER 
            },
            RESULT = _buildSearchResult( SEARCH_OBJ);
            yield call( new DataService()._persistDocument, 
                        USER_KEY, 
                        Object.assign( {}, RESULT, { timeStamp : Date.now() }) );
            const PAYLOAD = Object.assign( {}, RESULT);
            yield put( { type : SEARCH_CHANGE_SUCCESS, 
                payload : PAYLOAD
            });
            yield put( { type : TYPE_AHEAD_CHANGE_INIT});
        } else {
            yield put( { type : SEARCH_CHANGE_INIT});
            yield put( { type : TYPE_AHEAD_CHANGE_INIT});
        }
        yield put( { type : LOAD_APP_SUCCESS });
    } catch ( error) {
        // re-init the app in this case
        yield put( { type : LOAD_APP_SUCCESS});
        yield put( { type : SEARCH_CHANGE_INIT});
        yield put( { type : TYPE_AHEAD_CHANGE_INIT});
    }
}

// construct combined search result for eventual state persistence
const _buildSearchResult = ( searchObj) => {
    let retObj = {};

    if ( searchObj && searchObj.locationText && searchObj.locationName && 
         searchObj.weather) {
        retObj = {
                location : searchObj.locationText,
            locationName : searchObj.locationName,
                 current : searchObj.weather.currently,
                 outlook : searchObj.weather.daily,
                  hourly : searchObj.weather.hourly,
                  alerts : searchObj.weather.alerts
        }
    }
    return retObj;
}