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

  public editTrip(event, trip) {
    // console.log('TRIP SELECTED FROM TRIPS PAGE GOING INTO LOCALSTORAGE', trip);
    let storageTrip = JSON.stringify(trip)
    localStorage.setItem("trip", storageTrip);
    event.dialog.close();
    window.location.href = '/route';
  }

  ngOnInit() {
    this.navBar.updateTitle('Trips');
    this.getAllTrips();
  }

  interpolate(trip) {
    return `Origin: ${trip.route.split('->')[0]}
            ${trip.wayPoints.filter(waypoint => waypoint.length)
              .map((waypoint, i) => `Waypoint ${i + 1}: ${waypoint}`).join('\n')}
            Destination: ${trip.route.split('->')[1]}
            Start Date: ${trip.dateStart.split('T')[0]}
            End Date: ${trip.dateEnd.split('T')[0]}`
  }

  getAllTrips() {
    return this.trips
      .getAllTrips(this.currentUser)
      .subscribe((response: Object[]): void => {
        // console.log('Trips RETRIEVED from database', response);
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
}
