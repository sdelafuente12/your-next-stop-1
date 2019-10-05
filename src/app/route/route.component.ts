
import { Component, OnInit, ViewChild } from '@angular/core';
import { TripsService } from '../services/trips.service';
import { MapComponent } from '../map/map.component'
@Component({
  selector: 'app-route',
  templateUrl: './route.component.html',
  styleUrls: ['./route.component.scss']
})
export class RouteComponent implements OnInit {
  form = {
    origin: '',
    destination: '',
  }


  constructor(private trips: TripsService) {}
  @ViewChild(MapComponent, {static: false}) private map: MapComponent;

  ngOnInit() {
    // this.getAllTrips();
  }

  // public user = {
  //   dateTime: new Date(),
  //   fullName: undefined,
  // };

  // public onDateSelection(value) {
  //   this.user.dateTime.setDate((value as Date).getDate());
  // }

  public onSubmit() {
    this.map.getRoute(this.form);
  }


  // createTrip() {
  //   // console.log('TRIP START', this.origin);
  //   this.trips
  //     .createTrip({
  //       route: this.origin + ',' + this.destination
  //     })
  //     .subscribe(trip => {
  //       console.log('trip was posted to the db', trip);
  //     });
  // }

  // getAllTrips() {
  //   // console.log('CLICKEDDDDDDDDDDDDDDDDDDDDDDDDDDDDDD');
  //   return this.trips.getAllTrips().subscribe(trips => {
  //     console.log('trips are here', trips);
  //   });
  // }
}
