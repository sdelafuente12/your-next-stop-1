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
  thumbColor = false;
  userPlaces = [];

  constructor(private location: LocationService) {}

  ngOnInit() {
    this.getUserPlaces();
  }

  getUserPlaces() {
    this.location.getUserPlaces(this.userId).subscribe(userPlace => {
      console.log(userPlace);
      this.userPlaces.push(userPlace);
    });
  }

  getImageSrc(ref) {
    return `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${ref}&key=${API_KEY}`;
  }

  toggleThumb() {
    this.thumbColor = !this.thumbColor;
  }

  onUpvote(place) {
    this.toggleThumb();
    this.location.upvoteInterest(place, this.userId).subscribe(response => {
    });
  }
}
