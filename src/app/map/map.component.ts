import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { mapStyle } from './map-style.js';
import { LocationService } from '../services/location.service'
import { switchMap, flatMap } from 'rxjs/operators';
import { RouteService } from '../services/route.service.js';
import { WindowRef } from '../services/window.service'
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})


export class MapComponent implements OnInit, OnDestroy {
//custom map style
  styles = mapStyle;
//geolocation properties
  currentPosition;
  currentPositionString;
  origin;
  destination;
//location subsciptions
  exploreSubscription;
  routeSubscription;
  currentLocationSubscription;
  imageSubscription;

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
  images = [];

  private _window;

  constructor(
    private router: Router, 
    private locationService: LocationService, 
    private routeService: RouteService,
    private windowRefService: WindowRef,
    private sanitizer: DomSanitizer
    ) { 
    this.snapshotUrl = router.routerState.snapshot.url;
  }

  ngOnInit() {
    this._window = this.windowRefService.nativeWindow;

    if (this.snapshotUrl === '/explore'){ //if explore view is active, populates currentposition and nearby locations
      this.exploreSubscription = this.locationService.getCurrentPosition()
      .pipe(
        switchMap(position => {
          this.currentPosition = {
                      // lat: 29.96768435314543,
                      // lng: -90.05025405587452
                  lat: position.coords.latitude,
                  lng: position.coords.longitude
                }
          return this.locationService.getNearbyPlaces(position)
        })
        )
        .subscribe(places => {
          this.nearbyPlaces = places;
          this.nearbyPlaces.map((place, i) => this.getPlacePhoto(place.photos, i))
          console.log(this.nearbyPlaces)
        })

    }
    //subscribes to currentlocation only
    if (this.snapshotUrl === '/route') {
      this.currentLocationSubscription = this.locationService.getCurrentPosition()
      .subscribe(position => {
          this.currentPosition = {
                  lat: position.coords.latitude,
                  lng: position.coords.longitude
                }
      });
    }
    
  }
  //for conveniently getting lat, lng from map
  showClickedPosition(event) {
    console.log(event);
  }
  //calls google geocode API to convert user inputted addresses into geocoordinates
  setRoute(route) {
    this.routeSubscription = this.routeService.getRoutePositions(route)
      .subscribe(routePositions => { 
        console.log(routePositions) 
        this.origin = routePositions[0].location;
        this.destination = routePositions[1].location;
      })
  }

  getPlacePhoto(photoRef, index) {
    // if(!this.images[index]) {
      this.imageSubscription = this.locationService.getPlacePhoto(photoRef)
        .subscribe(photo => {
          console.log(index)
          // this.onLoadReadBlobAsBase64(photo);
          // this.image = photo;
          this.images[index] = this._window.URL.createObjectURL(photo);
          console.log(this.images)
        })
    // }  
  }

  // onLoadReadBlobAsBase64(blob) {
  //   const reader = new FileReader();
  //   // result includes identifier 'data:image/png;base64,' plus the base64 data
  //   reader.readAsDataURL(blob);
  //   reader.onloadend = () => {
  //   this.image = reader.result;
  //   console.log(this.image)
  // }
  // }

  ngOnDestroy() {
    //subscription cleanup
    if(this.exploreSubscription) this.exploreSubscription.unsubscribe();
    if(this.routeSubscription) this.routeSubscription.unsubscribe();
    if(this.currentLocationSubscription) this.currentLocationSubscription.unsubscribe();
    if(this.imageSubscription) this.imageSubscription.unsubscribe();
  }

}
