import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { LocationService } from '../services/location.service';
import { MapService } from '../services/map.service';
import { switchMap, map, mergeMap } from 'rxjs/operators';

@Injectable()
export class PositionResolver implements Resolve<any>{

    constructor(private locationService: LocationService) {}
    resolve(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<any> {
            return this.locationService.getCurrentPosition().pipe(
                mergeMap(position => this.locationService.getNearbyPlaces(position))
                )
            
                    // .switchMap(position => {
                    //     const currentPositionString = `${position.coords.latitude},${position.coords.longitude}`;
                    //     this.locationService.getNearbyPlaces(currentPositionString)
                    // })
        }
}
