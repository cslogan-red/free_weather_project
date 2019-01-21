import { MENU_SHOW, MENU_HIDE, MENU_LOCATION } from '../actions/actionTypes';
/**
* menuReducer.js
* 
* @abstract reducer inits/changes menu state, routes for menuSaga
* @author Chase
*/
const INIT_STATE = {
       showMenu : false,
    getLocation : false
};

const _menuReducer = ( state = INIT_STATE, action) => {
    switch ( action.type) {
        case MENU_LOCATION:
            return Object.assign( {}, state, { showMenu : false, getLocation : true });
        case MENU_SHOW:
            return Object.assign( {}, state, { showMenu : true });
        case MENU_HIDE:
            return Object.assign( {}, state, { showMenu : false });
        default:
            return state;
    }
};

export default _menuReducer;