import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ActivatedRoute, ParamMap } from '@angular/router'
import { LocationService } from '../services/location.service';
import { map, take } from 'rxjs/operators';
import { API_KEY } from '../../../config.js';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {
  newColor = false;
  state$: Observable<object>;
  placeId: string;
  selectedPlaceInfo: {};
  selectedPlacePhoto: null;

  constructor(public activatedRoute: ActivatedRoute, private location: LocationService) { }
  
  toggleColor() {
    this.newColor = !this.newColor;
    console.log('color change')
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

}
