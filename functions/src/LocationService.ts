import * as request from 'request-promise-native';
/**
 * @abstract Location API service handling location provider requests
 * 
 * @author Chase
 */
export default class LocationService {

    // geocode a given location string into lat/lng coords
    _geocodeLocationAsync = async ( locationText) => {
        const GEO_API_PREFIX = 'https://maps.googleapis.com/maps/api/geocode/json?address=', 
              GEO_API_SUFFIX = '&key=<YOUR API KEY>', 
                         URI = GEO_API_PREFIX + locationText + GEO_API_SUFFIX,
                     OPTIONS = { uri : URI, json : true },
                  EXP_PREFIX = ':::LocationService._geocodeLocationAsync(), exception message: '
        const retObj = { lat : '', lng : '', formattedAddr : '' };
        try {
            const RESOLVE = await request.get( OPTIONS);
            retObj.lat = RESOLVE.results[0].geometry.location.lat;
            retObj.lng = RESOLVE.results[0].geometry.location.lng;
            // construct local address, if available, default to provided formatted if not
            let neighborhood, city, state;
            RESOLVE.results[0].address_components.map( ( item, i) => {
                if ( item.types.includes( "neighborhood")) {
                    neighborhood = item.long_name;
                } else if ( item.types.includes( "locality")) {
                    city = item.long_name;
                } else if ( item.types.includes( "administrative_area_level_1")) {
                    state = item.short_name;
                };
            });
            const CONCAT = ', ';
            let addrString = '';
            if ( neighborhood && city && state) {
                addrString += neighborhood + CONCAT + city + CONCAT + state;
            }
            retObj.formattedAddr = addrString ? addrString 
                : RESOLVE.results[0].formatted_address;
        } catch ( e) {
            // log it on server side debug console
            console.log( EXP_PREFIX + e);
        }
        return retObj;
    };
}