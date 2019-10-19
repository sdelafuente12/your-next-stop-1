import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LocationService } from '../services/location.service';

@Component({
  selector: 'app-places',
  templateUrl: './places.component.html',
  styleUrls: ['./places.component.scss']
})
export class PlacesComponent implements OnInit {
  userId = localStorage.getItem('userId');
  thumbColor = false;
  userPlaces = [];

  constructor(private location: LocationService, private router: Router) {}

  ngOnInit() {
    this.getUserPlaces();
  }

  getUserPlaces() {
    this.location.getUserPlaces(this.userId).subscribe(userPlace => {
      console.log(userPlace);
      this.userPlaces.push(userPlace);
    });
  }

  navigateWithState(id) {
    this.router.navigateByUrl('/details', { state: { id } });
  }

  toggleThumb() {
    this.thumbColor = !this.thumbColor;
  }

  onUpvote(place) {
    console.log('PLACE UPVOTED', place);
    this.toggleThumb();
    this.location.voteInterest(place, status, this.userId)
      .subscribe(response => {
        console.log('UPVOTE response', response);
      })
  }
}
