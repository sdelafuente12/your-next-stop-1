import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ActivatedRoute, ParamMap } from '@angular/router'
import { LocationService } from '../services/location.service';
import { map, take } from 'rxjs/operators';
import { API_KEY } from '../../../config.js';
import { TripsComponent } from '../trips/trips.component';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {
  thumbColor = false;
  saveColor = false;
  state$: Observable<object>;
  placeId: string;
  selectedPlaceInfo: {};
  selectedPlacePhoto: null;
  currentUser = localStorage.getItem('userId');

  constructor(public activatedRoute: ActivatedRoute, private location: LocationService) { }
  
  toggleThumb() {
    this.thumbColor = !this.thumbColor;
  }

  toggleSave() {
    this.saveColor = !this.saveColor;
  }

  ngOnInit() {
    this.state$ = this.activatedRoute.paramMap
      .pipe(
        map((value) => this.placeId = window.history.state),
        take(1)
        )
    this.state$.subscribe(state => 
      this.getPlaceInfo(state));
}

  getPlaceInfo(place) {
    // console.log('PLACEEEE', place);
    this.location.getPlaceInfo(place)
    .subscribe(info => {
      console.log('INFO', info);
      this.selectedPlaceInfo = info;
    })
  }

  getImageSrc(ref) {
    return `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${ref}&key=${API_KEY}`;
  }

  onUpvote(place) {
    console.log('PLACE UPVOTED', place);
    this.toggleColor();
    this.location.upvoteInterest(place, this.currentUser)
      .subscribe(response => {
        console.log('UPVOTE response', response);
      });
  }

}
