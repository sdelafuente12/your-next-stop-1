import { Component, OnInit, ViewChild } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import { MapComponent } from '../map/map.component';
import { from } from 'rxjs';

@Component({
  selector: 'app-explore',
  templateUrl: './explore.component.html',
  styleUrls: ['./explore.component.scss']
})
export class ExploreComponent implements OnInit {
  @ViewChild(MapComponent, {static: false}) private map: MapComponent;

  currentUser = localStorage.getItem('userId');
  public places = [];
  placesSubscription;
  constructor(private route: ActivatedRoute) {
    console.log('ROUTE', this.route.snapshot.queryParams);
  }

  ngOnInit() {
    const userId = this.route.snapshot.queryParams.id;
    console.log('USERID', userId)
    if (userId) {
      localStorage.setItem('userId', userId);
    }
  }

  loadPlaces() {
    this.placesSubscription = from(this.map.nearbyPlaces)
    .subscribe(place => {
      this.places.push(place)
      console.log(this.places)
    })
  }
}
