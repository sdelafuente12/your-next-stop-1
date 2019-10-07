import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { mapStyle } from './map-style.js';
import { LocationService } from '../services/location.service'
import { switchMap, flatMap } from 'rxjs/operators';
import { RouteService } from '../services/route.service.js';

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
//location subsciptions
  exploreSubscription;
  routeSubscription;
  currentLocationSubscription;

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
  image;

  constructor(private router: Router, private locationService: LocationService, private routeService: RouteService) { 
    this.snapshotUrl = router.routerState.snapshot.url;
  }

  ngOnInit() {
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
          // this.nearbyPlaces.iconElement = `<img src="${this.nearbyPlaces.icon}" alt="Smiley face" style="background: black;">`
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
    // if(!this.images && !this.images[index]) {
      this.locationService.getPlacePhoto(photoRef)
        .subscribe(photo => {
          console.log(photo)
          this.image = photo;
        })
    // }  
  }
  ngOnDestroy() {
    //subscription cleanup
    if(this.exploreSubscription) this.exploreSubscription.unsubscribe();
    if(this.routeSubscription) this.routeSubscription.unsubscribe();
    if(this.currentLocationSubscription) this.currentLocationSubscription.unsubscribe();
  }

}
