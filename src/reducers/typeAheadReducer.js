import { TYPE_AHEAD_CHANGE, TYPE_AHEAD_CHANGE_SUCCESS,
         TYPE_AHEAD_CHANGE_INIT, TYPE_AHEAD_CHANGE_FAILURE } from '../actions/actionTypes';
/**
* typeAheadReducer.js
* 
* @abstract reducer inits/changes typeAhead state, routes for typeAheadSaga
* @author Chase
*/
const INIT_STATE = {
    location : '',
};

const _typeAheadReducer = ( state = INIT_STATE, action) => {
    switch ( action.type) {
        case TYPE_AHEAD_CHANGE:
            return Object.assign( {}, state, { location : action.payload });
        case TYPE_AHEAD_CHANGE_SUCCESS:
            return Object.assign( {}, state, { location : action.payload });
        case TYPE_AHEAD_CHANGE_INIT:
            return Object.assign( {}, state, { location : '' });
        case TYPE_AHEAD_CHANGE_FAILURE :
            return Object.assign( {}, state, action.error);
        default:
            return state;
    }
};

export default _typeAheadReducer;