/**
 * @abstract Service class handling async weather related API calls
 * 
 * @author Chase
 */
class WeatherService {

    // lookup local weather information based on lat & lng
    _getWeatherResultAsync = async (lat, lng) => {
        const WEATHER_API_PREFIX = '/api/v1/weather/lookup/', 
                             URI = WEATHER_API_PREFIX + lat + ',' + lng;
        let retObj = { currently : {}, daily : [], hourly : [] };
        return fetch(URI)
        .then(res => res.json())
        .then((result) => {
            // convert times to local client timezone
            // eslint-disable-next-line
            result.hourly.map((item) => {
                item.time = this._toLocalHour(item.time, result.currently.timezone);
            });
            // eslint-disable-next-line
            result.daily.map((item) => {
                item.date = this._toLocalDate(item.date, result.currently.timezone);
                item.sunriseTime = this._toLocalHourAndMinute(item.sunriseTime, 
                                                               result.currently.timezone);
                item.sunsetTime = this._toLocalHourAndMinute(item.sunsetTime, 
                                                              result.currently.timezone);
            });
            if (result.alerts) {
                // eslint-disable-next-line
                result.alerts.map((item) => {
                    item.dateIssued = 
                        this._toLocalDate(item.time, 
                                           result.currently.timezone) + ' ' +
                        this._toLocalHourAndMinute(item.time, 
                                                    result.currently.timezone);
                    item.expires = 
                        this._toLocalDate(item.expires, 
                                           result.currently.timezone) + ' ' +
                        this._toLocalHourAndMinute(item.expires, 
                                                    result.currently.timezone);
                });
            }
            result.currently.sunriseTime = 
                this._toLocalHourAndMinute(result.currently.sunriseTime, 
                                            result.currently.timezone);
            result.currently.sunsetTime = 
                this._toLocalHourAndMinute(result.currently.sunsetTime, 
                                            result.currently.timezone);
            if (result.daily && result.daily.length > 0) {
                result.currently.tempHigh = result.daily[0].tempHigh;
                result.currently.tempLow = result.daily[0].tempLow;
            } 
            return result;
        }, (error) => {
            return retObj;
        });
    };

    // converts unix time stamp to locale time
    _toLocalTime = (unixTime, timezone) => {
        let retVal = '';
        if (unixTime) retVal = new Date(unixTime * 1000)
            .toLocaleTimeString('en-US', { timeZone: timezone });
        return retVal;
    }

    // converts unix time stamp to locale time hour
    _toLocalHour = (unixTime, timezone) => {
        let retVal = '';
        if (unixTime) {
            const localTime = this._toLocalTime(unixTime, timezone);
            retVal = localTime.substring(0, localTime.indexOf(':')) +
                     localTime.substring(localTime.indexOf(' ') + 1);
        }
        return retVal;
    }

    // converts unix time stamp to locale time hour and minute
    _toLocalHourAndMinute = (unixTime, timezone) => {
        let retVal = '';
        if (unixTime) {
            const localTime = this._toLocalTime(unixTime, timezone);
            retVal = localTime.substring(0, localTime.lastIndexOf(':')) +
                     localTime.substring(localTime.indexOf(' ') + 1);
        }
        return retVal;
    }

    // converts unix time stamp to locale date
    _toLocalDate = (unixTime, timezone) => {
        let retVal = '';
        if (unixTime) {
            const temp = new Date(unixTime * 1000).toDateString('en-US', { timeZone: timezone });
            retVal = temp.replace(' ', ', ');
        }
        return retVal;
    }
}

export default WeatherService;
