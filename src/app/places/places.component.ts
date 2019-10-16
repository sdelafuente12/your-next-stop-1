import { Component, OnInit } from '@angular/core';
import { LocationService } from '../services/location.service';
import { API_KEY } from '../../../config.js';

@Component({
  selector: 'app-places',
  templateUrl: './places.component.html',
  styleUrls: ['./places.component.scss']
})
export class PlacesComponent implements OnInit {

  userId = localStorage.getItem('userId');
  newColor = false;
  userPlaces = [];

  constructor(private location: LocationService) {}

  ngOnInit() {
    this.getUserPlaces();
  }

  getUserPlaces() {
    this.location.getUserPlaces(this.userId)
    .subscribe(userPlace => {
      console.log(userPlace);
      this.userPlaces.push(userPlace);
    })
  }

  getImageSrc(ref) {
    return `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${ref}&key=${API_KEY}`;
  }

  toggleColor() {
    this.newColor = !this.newColor;
    console.log('color change');
  }

  onUpvote(place) {
    console.log('PLACE UPVOTED', place);
    this.toggleColor();
    this.location.upvoteInterest(place, status, this.userId)
      .subscribe(response => {
        console.log('UPVOTE response', response);
      })
  }
  
}
