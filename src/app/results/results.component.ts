import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { LocationService } from '../services/location.service'

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss']
})

export class ResultsComponent implements OnInit {
  @Output() placesLoaded = new EventEmitter<string>();
  currentUser = localStorage.getItem('userId');
  public allPlaces = [];
  allPlacesSubscription;
  constructor(private locationService: LocationService) { }

  ngOnInit() {
    this.loadPlaces();
  }

  loadPlaces() {
    return this.locationService.getCurrentPosition()
    .subscribe(loc => {
      console.log('LOCATION NATION', loc);
      this.allPlacesSubscription = this.locationService.getAllNearbyPlaces(loc)
      .subscribe(place => {
        this.allPlaces.push(place)
        console.log('ALL PLACES', this.allPlaces[0])
      });
    })
  }

}