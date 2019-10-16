import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LocationService {
  private getNearbyPlacesEndpoint = `${environment.BASE_API_URL}/nearbyPlaces`;
  private upvoteInterestEndpoint = `${environment.BASE_API_URL}/likedInterest`;
  private getPlacePhotoEndpoint = `${environment.BASE_API_URL}/placePhoto`;
  private getPlaceInfoEndpoint = `${environment.BASE_API_URL}/getPlaceInfo`;
  private getUserPlacesEndpoint = `${environment.BASE_API_URL}/getLikedAndSavedForLater`;
  private wait = false;

  constructor(private http: HttpClient) { }
  
  public getCurrentPosition(): Observable<Position> {
    return new Observable((observer) => {
      // Get the next and error callbacks. These will be passed in when
      // the consumer subscribes.
      let watchId;
      // next callback
      const onSuccess: PositionCallback = function(pos: Position) {
        observer.next(pos);
      };
      // error callback
      const onError: PositionErrorCallback | any = function(error) {
        observer.error(error);
      };
    
      // Simple geolocation API check provides values to publish
      if (navigator.geolocation) {
        watchId = navigator.geolocation.getCurrentPosition(onSuccess, onError,
          {
            enableHighAccuracy: false,
            timeout: 15000,
            maximumAge: 0
          }
          );
      } else {
        onError('Geolocation not available');
      }
      // When the consumer unsubscribes, clean up data ready for next subscription.
      return {unsubscribe() { navigator.geolocation.clearWatch(watchId); }};
    })
  }

  public getNearbyPlaces(location, snapshotUrl) {
    
    const currentPositionString = `${location.coords.latitude},${location.coords.longitude}`;
    const id = localStorage.getItem('userId');

    // if(!this.wait){
    //   this.wait = true;
    //   setTimeout(() => this.wait = false, 1000)

      return this.http.get(this.getNearbyPlacesEndpoint, {
        params: new HttpParams()
        .set('location', currentPositionString)
        .set('id', id)
        .set('snapshotUrl', snapshotUrl)
      })
    // }
  }

  public getPlacePhoto(coordinates) {
   
    return this.http.get(`${environment.BASE_API_URL}/yelpAPI`, {
      params: new HttpParams()
      .set('latitude', coordinates.lat)
      .set('longitude', coordinates.lng)
      .set('name', coordinates.name)
    })
    // return this.http.get(this.getPlacePhotoEndpoint, {
    //   responseType: "blob",
    //   params: new HttpParams().set('ref', photoRef)
    // })
  }

  public getPlaceInfo(place) {
    const placeId = place.id;
    return this.http.get(`${this.getPlaceInfoEndpoint}?placeId=${placeId}`)
  }

  upvoteInterest(upvotedPlace, userId) {
    console.log('UPVOTE SERVICE', this.upvoteInterestEndpoint);
    return this.http.post(this.upvoteInterestEndpoint, {
      interest: upvotedPlace.interest || upvotedPlace.category, userId: userId, name: upvotedPlace.name, hours: upvotedPlace.hours,
      coordinates: upvotedPlace.coordinates, city: upvotedPlace.city, address: upvotedPlace.address, phone: upvotedPlace.phone,
      photoRef: upvotedPlace.photos || upvotedPlace.photo, placeId: upvotedPlace.placeId, priceLevel: upvotedPlace.priceLevel,
      rating: upvotedPlace.rating, review: upvotedPlace.reviews || null, website: upvotedPlace.website || 'No website available',
    });
  }

  getUserPlaces(user) {
    return this.http.get(`${this.getUserPlacesEndpoint}?id=${user}`);
  }

}
