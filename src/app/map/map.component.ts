import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { mapStyle } from './map-style.js';
import { locations } from './observables';
import { MapService } from '../services/map.service';
import { LocationService } from '../services/location.service'

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
  currentPositionString;
  origin;
  destination;
  loaded;

  positionSubscription;
  mapSubscription;

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

  constructor(private router: Router, private mapService: MapService, private locationService: LocationService) { 
    this.snapshotUrl = router.routerState.snapshot.url;
  }

  ngOnInit() {
    //function for populating lat and lng based on the values that positionSubscription provides
    // const setCoords = (coords) => {
    //   this.currentPosition = {
    //       lat: coords.latitude,
    //       lng: coords.longitude
    //     }
    //   this.currentPositionString = `${coords.latitude},${coords.longitude}`
    // }
    //Observable subscription that realtime updates users geolocation
    // this.positionSubscription = this.locationService.getCurrentPosition().subscribe({
    //   next(position: Position) { 
    //     this.currentPosition = {
    //       lat: +(position.coords.latitude),
    //       lng: +(position.coords.longitude)
    //     }
    //     this.currentPositionString = `${position.coords.latitude},${position.coords.longitude}`;

    //   },
    //   error(msg) { console.log('Error Getting Location: ', msg); }
    // });
    this.positionSubscription = this.locationService.getCurrentPosition().subscribe({
      next(position: Position) { 
        this.currentPosition = {
          lat: +(position.coords.latitude),
          lng: +(position.coords.longitude)
        }
        this.currentPositionString = `${position.coords.latitude},${position.coords.longitude}`;

      },
      error(msg) { console.log('Error Getting Location: ', msg); }
    });
    //populate data for '/explore' endpoint
    if (this.snapshotUrl === '/explore'){ 
      // console.log(this.currentPositionString);
      // this.getNearbyPlaces(this.currentPositionString);
      this.mapSubscription = this.mapService.getNearbyPlaces('teststring plesae work annoying')
        .subscribe((data) => { console.log(data) })
      // this.mapService.getNearbyPlaces(this.currentPositionString)
      // .subscribe((data) => { console.log(data) })
      // this.waypoints = [
      //   { location: { lat: 29.98057427526072, lng: -90.07347342531739 } },
      //   { location: { lat: 29.9786784315525, lng: -90.09677645723878 } },
      //   { location: { lat: 29.980388409830528, lng: -90.0732588485962 } },
      //   { location: { lat: 29.992283096074008, lng: -90.07334467928467 } },
      //   { location: {lat: 29.986534772505895, lng: -90.09346961975098 } }
      // ]

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
    this.mapSubscription.unsubscribe();
  }

  getNearbyPlaces(location) {
    return this.mapSubscription = this.mapService.getNearbyPlaces(location)
      .subscribe((data) => { console.log(data) })
  }
}
