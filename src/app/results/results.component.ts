import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { LocationService } from '../services/location.service';
import { API_KEY } from '../../../config.js';
import { from } from 'rxjs';
import { distinct, take } from 'rxjs/operators';

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
  allPlacesSubscription;
  imagesSubscription;
  // private _window;

  constructor(private locationService: LocationService) { }

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

}