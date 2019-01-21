/**
 * @abstract Service class providing async timeout functionality
 * 
 * @author Chase
 */
class TimeoutService {

    // generic timeout function that "times out" after provided
    // number of ms, use with yield race and another function to 
    // effectively enforce a timeout
    _timeout = ( ms) => {
        return new Promise( ( resolve, reject) => {
            let timeout = setTimeout( () => {
                clearTimeout( timeout);
                reject();
            }, ms);
        });
    };
}

export default TimeoutService;