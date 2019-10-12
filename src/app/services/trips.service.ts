import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class TripsService {

  private getAllTripsEndpoint = `${environment.BASE_API_URL}/getAllUsersTrips`;

  constructor(private http: HttpClient) { }

  getAllTrips(user) {
    console.log('ENDGAME', this.getAllTripsEndpoint);
    return this.http.get(`${this.getAllTripsEndpoint}?id=${user}`);
  }

}