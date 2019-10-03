import { Component, OnInit } from '@angular/core';
import { Observable } from "rxjs"
import { styles } from './styles.js';

const options = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0
};

const locations = new Observable((observer) => {
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






@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})


export class MapComponent implements OnInit {
  lat: number;
  lng: number;
  styles = styles;
  currentLocation;
  positionSubscription;
  constructor() { }

  ngOnInit() {
    const setCoords = (coords) => {
      this.lat = coords.latitude;
      this.lng = coords.longitude;
      this.currentLocation = {
          lat: this.lat,
          lng: this.lng
        }
    }
    this.positionSubscription = locations.subscribe({
      next(position: any) { 
        setCoords(position.coords);
      },
      error(msg) { console.log('Error Getting Location: ', msg); }
    });
  }
  
  ngOnDestroy() {
    this.positionSubscription.unsubscribe();
  }
 

}
