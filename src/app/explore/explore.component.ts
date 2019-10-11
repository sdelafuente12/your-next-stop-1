import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MapComponent } from '../map/map.component';
import { from } from 'rxjs';

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
    this.placesSubscription = from(this.map.nearbyPlaces).subscribe(place => {
      console.log('places', this.map);
      this.places.push(place);
      console.log(this.places);
    });
  }

  loadImages() {
    this.imagesSubscription = from(this.map.images).subscribe(image => {
      console.log('images', this.map);
      this.images.push(image);
      console.log(this.images);
    });
  }
}
