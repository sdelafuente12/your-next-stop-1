import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MapComponent } from '../map/map.component';
import { LocationService } from '../services/location.service';
import { from } from 'rxjs';
import { IgxCarouselComponent, Direction } from 'igniteui-angular';
import { AgmInfoWindow } from '@agm/core';


@Component({
  selector: 'app-explore',
  templateUrl: './explore.component.html',
  styleUrls: ['./explore.component.scss']
})
export class ExploreComponent implements OnInit {
  @ViewChild(MapComponent, { static: false }) private map: MapComponent;
  @ViewChild(IgxCarouselComponent, { static: false })
  private carousel: IgxCarouselComponent;
  @ViewChild(AgmInfoWindow, { static: false }) private infoWindow: AgmInfoWindow;
  public places = [];
  public images = [];
  
  placesSubscription;
  imagesSubscription;
  newColor = false;
  currentUser = localStorage.getItem('userId');

  constructor(private route: ActivatedRoute, public router: Router, private location: LocationService) {}

  ngOnInit() {
    const userId = this.route.snapshot.queryParams.id;
    if (userId) {
      localStorage.setItem('userId', userId);
    }
  }

  loadPlaces() {
    if (!this.placesSubscription){
      this.placesSubscription = from(this.map.nearbyPlaces)
      .subscribe(place => {
        this.places.push(place)
    })
    }
  }

  loadImages(index) {
    this.images[index] = this.map.images[index].photos[0];
  }

  mapMarkerClicked(i) {
    const focus = this.carousel.get(i);
    this.carousel.select(focus, Direction.NEXT);
  }

  onSlideChanged(slideIndex, fromSlide) {
    this.map.markerClick(slideIndex, true);
  }

  toggleColor() {
    this.newColor = !this.newColor;
  }

  navigateWithState(id) {
    this.router.navigateByUrl('/details', { state: { id } });
  }

  onUpvote(place) {
    this.toggleColor();
    this.location.voteInterest(place, null, this.currentUser)
    .subscribe(response => {
    })
  }

  chooseCategory() {
    console.log('choose category');
  }
}
