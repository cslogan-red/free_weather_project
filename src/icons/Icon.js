import React from 'react';
import Sun from './Sun';
import Moon from './Moon';
import PartlySun from './PartlySun';
import PartlyMoon from './PartlyMoon';
import Cloudy from './Cloudy';
import Fog from './Fog';
import Rain from './Rain';
import Sleet from './Sleet';
import Snow from './Snow';
import Windy from './Windy';
import Sunrise from './Sunrise';
import Sunset from './Sunset';
import Search from './Search';
import Menu from './Menu';
import Close from './Close';
import Up from './Up';
import Down from './Down';

/**
 * Icon.js
 * 
 * @abstract Maps individual icon SVG components to API response names
 * @author Chase
 */
const Icon = props => {

    switch ( props.name) {
        case "clear-day" :
            return <Sun { ...props} />;
        case "clear-night" :
            return <Moon { ...props} />;
        case "partly-cloudy-day" :
            return <PartlySun { ...props} />;
        case "partly-cloudy-night" :
            return <PartlyMoon { ...props} />;
        case "cloudy" :
            return <Cloudy { ...props} />;
        case "fog" :
            return <Fog { ...props} />;
        case "rain" :
            return <Rain { ...props} />;
        case "sleet" :
            return <Sleet { ...props} />;
        case "snow" :
            return <Snow { ...props} />;
        case "wind" :
            return <Windy { ...props} />;
        case "sunrise" :
            return <Sunrise { ...props} />;
        case "sunset" :
            return <Sunset { ...props} />;
        case "search" :
            return <Search { ...props} />;
        case "menu" :
            return <Menu { ...props} />;
        case "close" :
            return <Close { ...props} />;
        case "up" :
            return <Up { ...props} />;
        case "down" :
            return <Down { ...props} />;
        default :
            return <Sun { ...props} />;
    }
}

export default Icon;