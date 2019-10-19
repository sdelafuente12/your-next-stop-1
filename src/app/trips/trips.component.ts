import { Component, OnInit } from '@angular/core';
import { TripsService } from '../services/trips.service';
import { NavbarService } from '../services/navbar.service';
@Component({
  selector: 'app-trips',
  templateUrl: './trips.component.html',
  styleUrls: ['./trips.component.scss']
})
export class TripsComponent implements OnInit {
  currentUser = localStorage.getItem('userId');
  public upcoming = [];
  public current = [];
  public previous = [];

  constructor(private trips: TripsService, private navBar: NavbarService) {}

  public selectTrip(event) {
    event.dialog.close();
  }

  ngOnInit() {
    this.navBar.updateTitle('Trips');
    this.getAllTrips();
  }

  getAllTrips() {
    return this.trips
      .getAllTrips(this.currentUser)
      .subscribe((response: Object[]): void => {
        // console.log('USERS TRIPS RESPONSE', response);
        response.forEach(element => {
          if (element[0].status === 'current') {
            this.current.push(element);
          }
          if (element[0].status === 'previous') {
            this.previous.push(element);
          } else if (element[0].status === 'upcoming') {
            this.upcoming.push(element);
          }
        });
      });
  }

  onSelection(trip) {
    console.log(trip);
    let storageTrip = JSON.stringify(trip);
    localStorage.setItem('trip', storageTrip);
  }
}
