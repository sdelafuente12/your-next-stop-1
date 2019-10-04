// import { Component, OnInit } from '@angular/core';

// @Component({
//   selector: 'app-route',
//   templateUrl: './route.component.html',
//   styleUrls: ['./route.component.scss']
// })
// export class RouteComponent implements OnInit {

//   constructor() { }

//   ngOnInit() {
//   }

// }

import { Component, OnInit } from '@angular/core';
import { TripsService } from '../services/trips.service';

@Component({
  selector: 'app-route',
  templateUrl: './route.component.html',
  styleUrls: ['./route.component.scss']
})
export class RouteComponent implements OnInit {
  origin = '';
  destination = '';

  constructor(private trips: TripsService) {}

  public user = {
    dateTime: new Date(),
    email: undefined,
    fullName: undefined,
    genres: undefined,
    movie: undefined,
    phone: undefined
  };

  public onDateSelection(value) {
    this.user.dateTime.setDate((value as Date).getDate());
  }

  public onSubmit() {
    console.log('submit');
  }

  ngOnInit() {
    this.getAllTrips();
  }

  createTrip() {
    // console.log('TRIP START', this.origin);
    this.trips
      .createTrip({
        route: this.origin + ',' + this.destination
      })
      .subscribe(trip => {
        console.log('trip was posted to the db', trip);
      });
  }

  getAllTrips() {
    // console.log('CLICKEDDDDDDDDDDDDDDDDDDDDDDDDDDDDDD');
    return this.trips.getAllTrips().subscribe(trips => {
      console.log('trips are here', trips);
    });
  }
}
