import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MapComponent } from '../map/map.component';
import { from } from 'rxjs';
import { distinct } from 'rxjs/operators';

@Component({
  selector: 'app-explore',
  templateUrl: './explore.component.html',
  styleUrls: ['./explore.component.scss']
})
export class ExploreComponent implements OnInit {
  @ViewChild(MapComponent, { static: false }) private map: MapComponent;

  currentUser = localStorage.getItem('userId');
  public places = [];
  public images = [];

  placesSubscription;
  imagesSubscription;
  constructor(private route: ActivatedRoute) {
    console.log('PLACESSSSSSSSSSSSSSSSSSSS', this.places);
    console.log('ROUTE', this.route.snapshot.queryParams);
  }

  ngOnInit() {
    const userId = this.route.snapshot.queryParams.id;
    if (userId) {
      localStorage.setItem('userId', userId);
    }
  }

  loadPlaces() {
    this.placesSubscription = from(this.map.nearbyPlaces)
    .subscribe(place => {
      this.places.push(place)
      // console.log(this.places)
    })
  }

  loadImages() {
    this.imagesSubscription = from(this.map.images)
    .pipe(
      distinct()
    )
    .subscribe(image => {
      this.images.push(image);
    })
  }
}
