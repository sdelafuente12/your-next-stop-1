import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { LocationService } from '../services/location.service'
import { from } from 'rxjs';
import { distinct } from 'rxjs/operators';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss']
})

export class ResultsComponent implements OnInit {
  @Output() placesLoaded = new EventEmitter<string>();
  snapshotUrl = '/results';
  currentUser = localStorage.getItem('userId');
  public allPlaces = [];
  public images = [];
  allPlacesSubscription;
  imagesSubscription;

  constructor(private locationService: LocationService) { }

  ngOnInit() {
    this.loadPlaces();
    this.loadImages();
  }

  loadPlaces() {
    return this.locationService.getCurrentPosition()
    .subscribe(loc => {
      console.log('LOCATION NATION', loc);
      this.allPlacesSubscription = this.locationService.getNearbyPlaces(loc, this.snapshotUrl)
      .subscribe(place => {
        this.allPlaces.push(place)
        console.log('ALL PLACES', this.allPlaces[0])
      });
    })
  }

  loadImages() {
    this.imagesSubscription = from(this.allPlaces[0].images)
      .pipe(
        distinct()
      )
      .subscribe(image => {
        this.images.push(image);
      })
  }

  // loadImages() {
  //   this.imagesSubscription = from(this.allPlaces[0].photos)
  //     .pipe(
  //       distinct()
  //     )
  //     .subscribe(image => {
  //       console.log('IMAGES!!!!!!!!!!!!!', image);
  //       this.images.push(image);
  //     })
  // }

}