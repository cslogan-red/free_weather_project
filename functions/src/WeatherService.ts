import * as request from 'request-promise-native';
/**
 * @abstract Weather API service handling weather provider requests
 * 
 * @author Chase
 */
export default class WeatherService {

    // lookup local weather information based on lat & lng
    _getWeatherResultAsync = async (lat, lng) => {
        const WEATHER_API_PREFIX = 'https://api.darksky.net/forecast/<YOUR_API_KEY_HERE>', 
              WEATHER_API_SUFFIX = '?exclude=minutely',
                             URI = WEATHER_API_PREFIX + lat + ',' + lng + WEATHER_API_SUFFIX,
                         OPTIONS = { uri : URI, json : true },
                      EXP_PREFIX = ':::WeatherService._getWeatherResultAsync(), exception message: ';
        const retObj = { currently : {}, daily : [], hourly : [], alerts : [] };
        try {
            const TEMP_UNIT = 'F',
                    RESOLVE = await request.get(OPTIONS);
            // build currently
            retObj.currently = {
                         temp : Math.round(RESOLVE.currently.temperature) + TEMP_UNIT,
                feelsLikeTemp : Math.round(RESOLVE.currently.apparentTemperature) + TEMP_UNIT,
                         icon : RESOLVE.currently.icon,
                      summary : RESOLVE.currently.summary,
                     humidity : Math.round(RESOLVE.currently.humidity * 100),
                    windSpeed : Math.round(RESOLVE.currently.windGust),
                  sunriseTime : RESOLVE.daily.data ? RESOLVE.daily.data[0].sunriseTime : '',
                   sunsetTime : RESOLVE.daily.data ? RESOLVE.daily.data[0].sunsetTime : '',
                     timezone : RESOLVE.timezone
            };
            // build daily
            RESOLVE.daily.data.map((item) => {
                const day = { 
                      ...item,
                    tempHigh : Math.round(item.temperatureHigh) + TEMP_UNIT,
                     tempLow : Math.round(item.temperatureLow) + TEMP_UNIT,
                };
                retObj.daily.push(day);
            });
            // build hourly
            RESOLVE.hourly.data.map((item) => {
                const hour = {
                    temp : Math.round(item.temperature) + TEMP_UNIT,
                    time : item.time,
                    icon : item.icon,
                    precip : Math.round(item.precipProbability * 100)
                };
                retObj.hourly.push(hour);
            });
            // build alerts, if present
            if (RESOLVE.alerts) {
                RESOLVE.alerts.map((item) => {
                    const alert = { ...item, dateIssued: item.time };
                    retObj.alerts.push(alert);
                });
            }
        } catch (e) {
            // log it on server side debug console
            console.log(EXP_PREFIX + e);
        }
        return retObj;
    };
}