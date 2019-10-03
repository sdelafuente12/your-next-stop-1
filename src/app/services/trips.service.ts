import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class TripsService {

  private tripsEndpoint = `${environment.BASE_API_URL}/addTrip`;

  constructor(private http: HttpClient) { }

  createTrip(tripData) {
    console.log('TRIP ENVIRONMENT', environment)
    return this.http.post(this.tripsEndpoint, tripData);
  }
}