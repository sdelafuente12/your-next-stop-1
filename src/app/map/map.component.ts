import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { mapStyle } from './map-style.js';
import { MapService } from '../services/map.service';
import { LocationService } from '../services/location.service'
import { switchMap, map, mergeMap } from 'rxjs/operators';

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
//places near current position
  nearbyPlaces;
//endpoint of current view based on Router
  snapshotUrl: string;

  constructor(private router: Router, private locationService: LocationService, private route: ActivatedRoute) { 
    this.snapshotUrl = router.routerState.snapshot.url;
  }

  ngOnInit() {
    if (this.snapshotUrl === '/explore'){ //if explore view is active, populates currentposition and nearby locations
      this.positionSubscription = this.locationService.getCurrentPosition()
      .pipe(
        switchMap(position => {
          this.currentPosition = {
                  lat: position.coords.latitude,
                  lng: position.coords.longitude
                }
          return this.locationService.getNearbyPlaces(position)
        })
        )
        .subscribe(places => {
          this.nearbyPlaces = places;
          console.log(this.nearbyPlaces)
        })

    }
    //in progress
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
