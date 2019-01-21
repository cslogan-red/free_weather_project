import TimeoutService from './TimeoutService';
/**
 * @abstract Service class handling async location related API calls
 * 
 * @author Chase
 */
class LocationService {

    // geocode a given location string into lat/lng coords via api layer
    _geocodeLocationAsync = async ( locationText) => {
        const GEO_API_PATH = '/api/v1/location/', 
                       URI = GEO_API_PATH + locationText,
                ERR_PREFIX = ':::LOG:::LocationService._geocodeLocationAsync(), message: ';
        let retObj = { lat : '', lng : '', formattedAddr : '' };
        return fetch( URI)
        .then( res => res.json())
        .then( ( result) => {
            // if results, get geo coords and return
            if ( result.lat) {
                retObj.lat = result.lat;
                retObj.lng = result.lng;
                retObj.formattedAddr = result.formattedAddr;
            }
            return retObj;
        }, ( error) => {
            console.log( ERR_PREFIX + error);
            return retObj;
        });
    };

    // look up a given clients current location
    _getClientLocation = async () => {
        const ERR_PREFIX = ':::LOG:::LocationService._getClientLocation(), message: ';
        const retObj = { lat : '', lng : ''};
        if ( navigator.geolocation) {
            return await Promise.race( [
                this._getGeoCoords(),
                new TimeoutService()._timeout( 15000)] )
            .then( result => {
                retObj.lat = result.coords.latitude;
                retObj.lng = result.coords.longitude;
                return retObj;
            })
            .catch( error => {
                console.log( ERR_PREFIX + error);
                return retObj;
            });
        }
    }

    // grab geolocation coords, run on a 15 second timeout
    _getGeoCoords = ( options = {}) => {
        return new Promise( ( resolve, reject) => {
            navigator.geolocation.getCurrentPosition( resolve, reject, options)
        });
    }
}

export default LocationService;
