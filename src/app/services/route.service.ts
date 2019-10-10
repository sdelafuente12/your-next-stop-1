import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { HttpParams } from "@angular/common/http";
import { CustomHttpParamEncoder } from '../custom-http-param-encoder';

@Injectable({
  providedIn: 'root'
})
export class RouteService {
  private getRoutePositionsEndpoint = `${environment.BASE_API_URL}/routePositions`;
  private autocompleteAddressEndpoint = `${environment.BASE_API_URL}/autocompleteAddress`;
  constructor(private http: HttpClient) { }

  getRoutePositions(route) {
  
    return this.http.get(this.getRoutePositionsEndpoint, {
      params: new HttpParams({ encoder: new CustomHttpParamEncoder() })
                  .set('origin', route.origin)
                  .set('destination', route.destination)
                  .set('waypoints', route.waypoints)
    })
  }
  
  autoSuggestion(text, location) {
    let currentPositionString;
    if (location.length) {
      currentPositionString  = `${location.lat},${location.lng}`;
    } else {
      currentPositionString = '';
    }
    return this.http.get(this.autocompleteAddressEndpoint, {
      params: new HttpParams().set('input', text).set('location', currentPositionString)
    })
  }
}
