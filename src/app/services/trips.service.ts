import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../environments/environment';
import { PathLocationStrategy } from '@angular/common';

@Injectable({
  providedIn: 'root'
})

export class TripsService {

  private getAllTripsEndpoint = `${environment.BASE_API_URL}/getAllUsersTrips`;
  private getUserStatsEndpoint = `${environment.BASE_API_URL}/getStats`;

  constructor(private http: HttpClient) { }

  getAllTrips(user) {
    console.log('ENDGAME', this.getAllTripsEndpoint);
    return this.http.get(`${this.getAllTripsEndpoint}?id=${user}`);
  }

  getStats(user) {
    return this.http.get(`${this.getUserStatsEndpoint}?id=${user}`);
  }

}