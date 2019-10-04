import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class MapService {
  private getNearbyPlacesEndpoint = `${environment.BASE_API_URL}/nearbyPlaces/:geoLocation`;

  constructor(private http: HttpClient) { }

  getNearbyPlaces(location) {
    return this.http.get(this.getNearbyPlacesEndpoint, {
      params: location
    })
  }

}
