import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MapComponent } from '../map/map.component';
import { from } from 'rxjs';
import { distinct } from 'rxjs/operators';
import  { IgxCarouselComponent, Direction } from 'igniteui-angular';

@Component({
  selector: 'app-explore',
  templateUrl: './explore.component.html',
  styleUrls: ['./explore.component.scss']
})
export class ExploreComponent implements OnInit {
  @ViewChild(MapComponent, { static: false }) private map: MapComponent;
  @ViewChild(IgxCarouselComponent, { static: false }) private carousel: IgxCarouselComponent;
  currentUser = localStorage.getItem('userId');
  public places = [];
  public images = [];

  placesSubscription;
  imagesSubscription;
  constructor(private route: ActivatedRoute) {
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
      console.log('EXPLORE PLACES', this.places)
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

  mapMarkerClicked(i) {
    console.log(i)
    const focus = this.carousel.get(i);
    this.carousel.select(focus, Direction.NEXT);
  }
}
