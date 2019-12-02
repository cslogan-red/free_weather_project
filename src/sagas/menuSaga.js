import { select, put, race, call } from 'redux-saga/effects';
import { delay } from 'redux-saga';
import { MENU_SHOW, MENU_HIDE, SEARCH_CHANGE } from '../actions/actionTypes';
import LocationService from '../services/LocationService';
/**
 * menuSaga.js
 * 
 * @abstract saga represents a triggered menu action
 * @author Chase
 */

const _getShowMenu = state => state.menu.showMenu;
const _getMyLocation = state => state.menu.getLocation;

 // menu icon touch/click
export function* _menuClick() {

    try {
        const MENU = yield select(_getShowMenu);
        if (MENU) {
            yield put({ type : MENU_HIDE});
        } else {
            yield put({ type : MENU_SHOW});
        }
    } catch (error) {
        yield put({ type : MENU_HIDE});
    }
}

// menu my location touch/click
export function* _menuLocation() {

    try {
        const LOCATION = yield select(_getMyLocation);
        if (LOCATION) {
            const { USER_LOC, TIMEOUT } = yield race({ 
                USER_LOC : call(new LocationService()._getClientLocation),
                 TIMEOUT : call(delay, 15000)
            });
            if (TIMEOUT) {
                yield put({ type : MENU_HIDE});
            } else if (USER_LOC) {
                yield put({ type : SEARCH_CHANGE, 
                          payload : USER_LOC.lat + ',' + USER_LOC.lng });
            }
        }
    } catch (error) {
        yield put({ type : MENU_HIDE});
    }
}