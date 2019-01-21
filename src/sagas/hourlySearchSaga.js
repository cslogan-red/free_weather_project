import { select, put } from 'redux-saga/effects';
import { HOURLY_HIDE, HOURLY_SHOW } from '../actions/actionTypes';
/**
 * hourlySearchSaga.js
 * 
 * @abstract saga represents a triggered hourly display
 * @author Chase
 */

const _getShowHourly = state => state.hourly.show;

 // hourly display touch/click
export function* _hourlyClick() {

    try {
        const HOURLY = yield select( _getShowHourly);
        if ( HOURLY) {
            yield put( { type : HOURLY_HIDE});
        } else {
            yield put( { type : HOURLY_SHOW});
        }
    } catch ( error) {
        yield put( { type : HOURLY_HIDE});
    }
}