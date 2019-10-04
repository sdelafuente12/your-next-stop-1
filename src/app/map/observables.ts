import { Observable } from "rxjs";

//geolocation options
const options = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0
};

export const locations = new Observable((observer) => {
    // Get the next and error callbacks. These will be passed in when
    // the consumer subscribes.
    let watchId;
    // next callback
    const onSuccess: PositionCallback = function(pos: Position) {
      observer.next(pos);
    };
    // error callback
    const onError: PositionErrorCallback | any = function(error) {
      observer.error(error);
    };
  
    // Simple geolocation API check provides values to publish
    if (navigator.geolocation) {
      watchId = navigator.geolocation.watchPosition(onSuccess, onError, options);
    } else {
      onError('Geolocation not available');
    }
    // When the consumer unsubscribes, clean up data ready for next subscription.
    return {unsubscribe() { navigator.geolocation.clearWatch(watchId); }};
  });

 