import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { LocationService } from '../services/location.service';
import { API_KEY } from '../../../config.js';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss']
})

export class ResultsComponent implements OnInit {
  @Output() placesLoaded = new EventEmitter<string>();
  // @Output() imagesLoaded = new EventEmitter<string>();
  snapshotUrl = '/results';
  currentUser = localStorage.getItem('userId');
  public allPlaces = [];
  public images = [];
  newColor = false;
  allPlacesSubscription;
  imagesSubscription;
  // private _window;

  constructor(public router: Router, private locationService: LocationService) { }

  ngOnInit() {
    this.loadPlaces();
  }

  loadPlaces() {
    return this.locationService.getCurrentPosition()
    .subscribe(loc => {
      // console.log('LOCATION NATION', loc);
      const stubLocation = { coords: {latitude: 47.62005908114151,
        longitude: -122.32398084206318} }

      this.allPlacesSubscription = this.locationService.getNearbyPlaces(stubLocation, this.snapshotUrl)
      .subscribe(place => {
        this.allPlaces.push(place);
        console.log('ALL PLACES', this.allPlaces[0]);
        //console.log('IMAGE REFERENCE', this.allPlaces[0][0][0].photos);
      });
    })
  }

  navigateWithState(id) {
    // console.log('ID', id);
    this.router.navigateByUrl('/details', { state: { id } });
  }

  getImageSrc (ref) {
    return `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${ref}&key=${API_KEY}`;
  }

  toggleColor() {
    this.newColor = !this.newColor;
    console.log('color change');
  }

  onUpvote(place) {
    console.log('PLACE UPVOTED', place);
    this.toggleColor();
    this.locationService.upvoteInterest(place, null, this.currentUser)
      .subscribe(response => {
        console.log('UPVOTE response', response);
    });
  }

}