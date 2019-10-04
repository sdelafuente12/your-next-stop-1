import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class TripsService {

  private getAllTripsEndpoint = `${environment.BASE_API_URL}/getAllTrips`;
  private postTripsEndpoint = `${environment.BASE_API_URL}/addTrip`;

  constructor(private http: HttpClient) { }

  getAllTrips() {
    return this.http.get(this.getAllTripsEndpoint);
  }

  createTrip(tripData) {
    return this.http.post(this.postTripsEndpoint, tripData);
  }

}