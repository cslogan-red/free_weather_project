import { HOURLY_SHOW, HOURLY_HIDE } from '../actions/actionTypes';
/**
 * hourlySearchReducer.js
 * 
 * @abstract reducer inits/changes hourly state, routes for hourlySearchSaga
 * @author Chase
 */
const INIT_STATE = {
    show : false 
};

const _hourlySearchReducer = ( state = INIT_STATE, action) => {
    switch ( action.type) {
        case HOURLY_SHOW:
            return Object.assign( {}, state, { show : true });
        case HOURLY_HIDE:
            return Object.assign( {}, state, { show : false });
        default:
            return state;
    }
};

export default _hourlySearchReducer;