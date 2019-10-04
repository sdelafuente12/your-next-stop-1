import { Component, OnInit } from '@angular/core';
import { Observable } from "rxjs"
import { mapStyle } from './map-style.js';
import { Router } from '@angular/router';
//geolocation options
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
//custom map style
    styles = mapStyle;
//geolocation properties
  currentPosition;
  origin;
  destination;
  positionSubscription;

//custom marker image
  markerOptions = {
    icon: '../assets/icons/looks-24px.svg'
  };
//options for map rendering
  renderOptions = {
    suppressPolylines: false,
    markerOptions: this.markerOptions
  };
//all route points between origin and destination
  waypoints;
//endpoint of current view based on Router
  snapshotUrl: string;

  constructor(private router: Router) { 
    this.snapshotUrl = router.routerState.snapshot.url;
  }

  ngOnInit() {
    //function for populating lat and lng based on the values that positionSubscription provides
    const setCoords = (coords) => {
      this.currentPosition = {
          lat: coords.latitude,
          lng: coords.longitude
        }
    }
    //Observable subscription that realtime updates users geolocation
    this.positionSubscription = locations.subscribe({
      next(position: any) { 
        setCoords(position.coords);
      },
      error(msg) { console.log('Error Getting Location: ', msg); }
    });
    //populate data for '/explore' endpoint
    if (this.snapshotUrl === '/explore'){ 

      this.waypoints = [
        { location: { lat: 29.98057427526072, lng: -90.07347342531739 } },
        { location: { lat: 29.9786784315525, lng: -90.09677645723878 } },
        { location: { lat: 29.980388409830528, lng: -90.0732588485962 } },
        { location: { lat: 29.992283096074008, lng: -90.07334467928467 } },
        { location: {lat: 29.986534772505895, lng: -90.09346961975098 } }
      ]

    }
    //populate data for '/route' endpoint
    if (this.snapshotUrl === '/route') {
      this.origin = { lat: 41.881832, lng: -87.623177 }
      this.destination = { lat: 29.986534772505895, lng: -90.09346961975098 };
    
      this.waypoints = [
        { location: { lat: 29.98057427526072, lng: -90.07347342531739 } },
        { location: { lat: 29.9786784315525, lng: -90.09677645723878 } },
        { location: { lat: 29.980388409830528, lng: -90.0732588485962 } },
        { location: { lat: 29.992283096074008, lng: -90.07334467928467 } },
        { location: {lat: 29.986534772505895, lng: -90.09346961975098 } }
      ]
    }
    
  }
  
  ngOnDestroy() {
    //subscription cleanup
    this.positionSubscription.unsubscribe();
  }

}
