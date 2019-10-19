import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router'
import { LocationService } from '../services/location.service';
import { map, take } from 'rxjs/operators';

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
  selectedPlaceInfo: {
    photo: any,
    name: any,
    interest: any, 
    category: any, 
    priceLevel: any, 
    rating: any, 
    website: any, 
    phone: any, 
    address: any,
    status?: string,
  };
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
    const currentUser = localStorage.getItem('userId');
    this.location.getPlaceInfo(place, currentUser)
    .subscribe((info: any) => {
      this.selectedPlaceInfo = info;
      
      if (info.status === 'liked') {
        this.selectedPlaceInfo.status = 'liked';
        this.thumbColor = true; 
      }
      if (info.status === 'saved') {
        this.selectedPlaceInfo.status = 'saved';
        this.saveColor = true;
      } 
      
    })
  }

  onSelection(place, status) {
    let action = status;
    if (status === 'liked') {
      this.toggleThumb();
      if (this.saveColor) {
        this.saveColor = false;
      }
      if (this.selectedPlaceInfo.status === 'liked') {
        action = 'remove';
        this.selectedPlaceInfo.status = null;
      } else {
        this.selectedPlaceInfo.status = 'liked';
      }
      

    } else {
      this.toggleSave();
      if (this.thumbColor) {
        this.thumbColor = false;
      }
      if (this.selectedPlaceInfo.status === 'saved') {
        action = 'remove';
        this.selectedPlaceInfo.status = null;
      } else {
        this.selectedPlaceInfo.status = 'saved';
      }
    }
    console.log(action)
    this.location.voteInterest(place, action, this.currentUser)
      .subscribe(response => {
        console.log('UPVOTE response', response);
      });
  }

}
