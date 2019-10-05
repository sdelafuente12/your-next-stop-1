import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { HttpParams } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class LocationService {
  private getNearbyPlacesEndpoint = `${environment.BASE_API_URL}/nearbyPlaces`;

  constructor(private http: HttpClient) { }
  
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
            timeout: 15000,
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

  public getNearbyPlaces(location) {
    const currentPositionString = `${location.coords.latitude},${location.coords.longitude}`;
    
    return this.http.get(this.getNearbyPlacesEndpoint, {
      params: new HttpParams().set('location', currentPositionString)
    })
  }

}
