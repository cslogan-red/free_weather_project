import { call, put, select } from 'redux-saga/effects';
import { TYPE_AHEAD_CHANGE_SUCCESS, TYPE_AHEAD_CHANGE_FAILURE,
         TYPE_AHEAD_CHANGE_INIT } from '../actions/actionTypes';
import LocationService from '../services/LocationService';
/**
 * typeAheadSaga.js
 * 
 * @abstract saga represents a triggered type head search
 * @author Chase
 */
const _getLocation = state => state.typeAhead.location;

 // type ahead location search via api layer
export function* _typeAheadSearch() {

    try {
        // lookup current location
        const LOC = yield select(_getLocation);
        if (LOC) {
            const RESULT = yield call(new LocationService()._geocodeLocationAsync, LOC);
            yield put({ type : TYPE_AHEAD_CHANGE_SUCCESS, payload : RESULT.formattedAddr});
        } else {
            yield put({ type : TYPE_AHEAD_CHANGE_INIT});
        }
    } catch (error) {
        yield put({ type : TYPE_AHEAD_CHANGE_FAILURE, error : error.message });
    }
}