import { Component, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { mapStyle } from './map-style.js';
import { LocationService } from '../services/location.service'
import { switchMap, flatMap, endWith, finalize, distinct, take } from 'rxjs/operators';
import { RouteService } from '../services/route.service.js';
import { WindowRef } from '../services/window.service'
import { DomSanitizer } from '@angular/platform-browser';
import { AgmSnazzyInfoWindowModule } from '@agm/snazzy-info-window';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})


export class MapComponent implements OnInit, OnDestroy {
  @Output() placesLoaded = new EventEmitter<string>();
  @Output() imagesLoaded = new EventEmitter<number>();
  @Output() markerClicked = new EventEmitter<number>();
  public currentLocationMarkerUrl: string = "../assets/icons/currentLocationMarker.png"
//custom map style"
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
    this.snapshotUrl = router.routerState.snapshot.url.split('?')[0];
  }

  ngOnInit() {
    this._window = this.windowRefService.nativeWindow;
    //if explore view is active, populates currentposition and nearby locations
    if (this.snapshotUrl === '/explore'){ 
      this.exploreSubscription = this.locationService.getCurrentPosition()
      .pipe(
        switchMap(position => {
          this.currentPosition = {
            lat: 45.53006858396305, lng: -122.65297249732771
                  // lat: position.coords.latitude,
                  // lng: position.coords.longitude
                }
               const p = {
                 coords: {latitude: this.currentPosition.lat, longitude: this.currentPosition.lng }
               }
          return this.locationService.getNearbyPlaces(p, this.snapshotUrl)
        })
        )
        .subscribe(places => {
          this.nearbyPlaces = places;
          this.placesLoaded.emit('places loaded')
          this.nearbyPlaces.map((place, i) => {
            const placeCoords = { lat: place.lat, lng: place.lng, name: place.name } 
            this.getPlacePhoto(placeCoords, i)
            // this.getPlacePhoto(place.photos, i)
          })
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
  //for conveniently getting lat, lng from map click
  showClickedPosition(event) {
    console.log(event);
  }
  //calls google geocode API to convert user inputted addresses into geocoordinates
  setRoute(route) {
    this.routeSubscription = this.routeService.getRoutePositions(route)
      .subscribe((routePositions: Array<any>): void => { 
        this.origin = routePositions[0];
        this.destination = routePositions[1];
        this.waypoints = routePositions.splice(2);
      })
  }
//gets top photo for each place
  getPlacePhoto(placeCoords, index) {
    if(!this.images[index]) {
      this.imageSubscription = this.locationService.getPlacePhoto(placeCoords)
      .pipe(
        distinct(),
        )
      .subscribe(photos => {
       
        this.images[index] = photos || ['http://www.moxmultisport.com/wp-content/uploads/no-image.jpg'];
        if (this.images.length) {//this number will need to be dynamic in the future (ncategories * nplaces)
          this.imagesLoaded.emit(index);
        }
      })
    }  
  }

  markerClick(index, fromSlide) {
    if (!this.nearbyPlaces[index].clicked) {
      this.nearbyPlaces.forEach((place, i) => {
        if(i === index) place.clicked = true;
        else place.clicked = false;
      })
      if (!fromSlide) this.markerClicked.emit(index)
    }
  }

  ngOnDestroy() {
    //subscription cleanup
    if(this.exploreSubscription) this.exploreSubscription.unsubscribe();
    if(this.routeSubscription) this.routeSubscription.unsubscribe();
    if(this.currentLocationSubscription) this.currentLocationSubscription.unsubscribe();
    if(this.imageSubscription) this.imageSubscription.unsubscribe();
  }

}
