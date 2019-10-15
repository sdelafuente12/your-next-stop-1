import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { LocationService } from '../services/location.service';
import { TripsService } from '../services/trips.service';
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

  constructor(private locationService: LocationService, private trips: TripsService) { }

  ngOnInit() {
    this.loadPlaces();
  }

  loadPlaces() {
    return this.locationService.getCurrentPosition()
    .subscribe(loc => {
      console.log('LOCATION NATION', loc);
      this.allPlacesSubscription = this.locationService.getNearbyPlaces(loc, this.snapshotUrl)
      .subscribe(place => {
        this.allPlaces.push(place);
        console.log('ALL PLACES', this.allPlaces[0]);
        //console.log('IMAGE REFERENCE', this.allPlaces[0][0][0].photos);
      });
    })
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
    this.trips.upvoteInterest(place, this.currentUser)
      .subscribe(response => {
        console.log('UPVOTE response', response);
    });
  }

}