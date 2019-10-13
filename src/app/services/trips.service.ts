import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class TripsService {

  private getAllTripsEndpoint = `${environment.BASE_API_URL}/getAllUsersTrips`;
  private upvoteInterestEndpoint = `${environment.BASE_API_URL}/likedInterest`;

  constructor(private http: HttpClient) { }

  getAllTrips(user) {
    console.log('ENDGAME', this.getAllTripsEndpoint);
    return this.http.get(`${this.getAllTripsEndpoint}?id=${user}`);
  }

  upvoteInterest(upvotedPlace, userId) {
    console.log('UPVOTE SERVICE', this.upvoteInterestEndpoint);
    return this.http.post(this.upvoteInterestEndpoint, { interest: upvotedPlace.interest, userId: userId, name: upvotedPlace.name });
  }

}