import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  constructor() { }
  
  public getCurrentPosition(): Observable<Position> {
    return new Observable((observer) => {
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
        watchId = navigator.geolocation.watchPosition(onSuccess, onError,
          {
            enableHighAccuracy: true,
            timeout: 5000,
            maximumAge: 0
          }
          );
      } else {
        onError('Geolocation not available');
      }
      // When the consumer unsubscribes, clean up data ready for next subscription.
      return {unsubscribe() { navigator.geolocation.clearWatch(watchId); }};
    })
  }
}
