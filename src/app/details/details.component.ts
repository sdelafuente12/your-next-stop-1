import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable, from } from 'rxjs';
import { ActivatedRoute } from '@angular/router'
import { map, take, distinct } from 'rxjs/operators';
import { MapComponent } from '../map/map.component';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {
  @ViewChild(MapComponent, { static: false }) private map: MapComponent;
  newColor = false;
  state$: Observable<object>;
  placeId: string;
  placesSubscription;
  imagesSubscription;
  public places = [];
  public images = [];

  constructor(public activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.state$ = this.activatedRoute.paramMap.pipe(
      map(value => (this.placeId = window.history.state)),
      take(1)
    );
    this.state$.subscribe(state => console.log('state', state));
  }

  loadPlaces() {
    this.placesSubscription = from(this.map.nearbyPlaces).subscribe(place => {
      this.places.push(place);
    });
  }

  loadImages() {
    this.imagesSubscription = from(this.map.images)
      .pipe(distinct())
      .subscribe(image => {
        this.images.push(image);
      });
  }

  toggleColor() {
    this.newColor = !this.newColor;
    console.log('color change');
  }
}
