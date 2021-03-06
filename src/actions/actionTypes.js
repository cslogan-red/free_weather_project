/**
 * actionTypes.js
 * 
 * @abstract all valid redux action types that can be dispatched, grouped by
 * reducer/saga
 * @author Chase
 */
export const LOAD_APP = 'LOAD_APP';
export const LOAD_APP_REQ = 'LOAD_APP_REQ';
export const LOAD_APP_SUCCESS = 'LOAD_APP_SUCCESS';
export const LOAD_APP_FAILURE = 'LOAD_APP_FAILURE';

export const SEARCH_CHANGE = 'SEARCH_CHANGE';
export const SEARCH_CHANGE_INIT = 'SEARCH_CHANGE_INIT';
export const SEARCH_CHANGE_SUCCESS = 'SEARCH_CHANGE_SUCCESS';
export const SEARCH_CHANGE_FAILURE = 'SEARCH_CHANGE_FAILURE';

export const EXTENDED_SEARCH = 'SEXTENDED_SEARCH';
export const EXTENDED_SEARCH_SUCCESS = 'EXTENDED_SEARCH_SUCCESS';
export const EXTENDED_CLOSE = 'EXTENDED_CLOSE';
 
export const HOURLY_CLICK = 'HOURLY_CLICK';
export const HOURLY_SHOW = 'HOURLY_SHOW';
export const HOURLY_HIDE = 'HOURLY_HIDE';

export const TYPE_AHEAD_CHANGE = 'TYPE_AHEAD_CHANGE';
export const TYPE_AHEAD_CHANGE_SUCCESS = 'TYPE_AHEAD_CHANGE_SUCCESS';
export const TYPE_AHEAD_CHANGE_INIT = 'TYPE_AHEAD_CHANGE_INIT'
export const TYPE_AHEAD_CHANGE_FAILURE ='TYPE_AHEAD_CHANGE_FAILURE';

export const MENU_CLICK = 'MENU_CLICK';
export const MENU_SHOW = 'MENU_SHOW';
export const MENU_HIDE = 'MENU_HIDE';
export const MENU_LOCATION = 'MENU_LOCATION';

export default actionTypes => {

    return { LOAD_APP, LOAD_APP_REQ, LOAD_APP_SUCCESS, LOAD_APP_FAILURE,
             SEARCH_CHANGE, SEARCH_CHANGE_INIT, SEARCH_CHANGE_SUCCESS, SEARCH_CHANGE_FAILURE,
             EXTENDED_SEARCH, EXTENDED_SEARCH_SUCCESS, EXTENDED_CLOSE,
             HOURLY_CLICK, HOURLY_SHOW, HOURLY_HIDE,
             TYPE_AHEAD_CHANGE, TYPE_AHEAD_CHANGE_SUCCESS, TYPE_AHEAD_CHANGE_INIT, 
             TYPE_AHEAD_CHANGE_FAILURE, MENU_CLICK, MENU_SHOW, MENU_HIDE, MENU_LOCATION };
};
