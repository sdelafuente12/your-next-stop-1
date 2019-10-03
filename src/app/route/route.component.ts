import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-route',
  templateUrl: './route.component.html',
  styleUrls: ['./route.component.scss']
})
export class RouteComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}


// import { Component, OnInit } from '@angular/core';
// import { TripsService } from '../services/trips.service';

// @Component({
//   selector: 'app-route',
//   templateUrl: './route.component.html',
//   styleUrls: ['./route.component.scss']
// })
// export class RouteComponent implements OnInit {

//   origin = '';
//   destination = '';

//   constructor(private trips: TripsService) { }

//   ngOnInit() {
//   }

//   createTrip() {
//     console.log('TRIP NAME', this.origin);
//     this.trips.createTrip({
//       }).subscribe(trip => {
//       console.log('user from user service', trip);
//     })
//   }

// }

