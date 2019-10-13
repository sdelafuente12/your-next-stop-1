import { Component, OnInit } from '@angular/core';
import { TripsService } from '../services/trips.service';
import { IgxTextHighlightDirective, IgxCardThumbnailDirective } from 'igniteui-angular';

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
  // public current = [
  //   {
  //     origin: 'New Orleans, LA',
  //     destination: 'Atlanta, GA'
  //   }
  // ];
  // public previous = [
  //   {
  //     origin: 'New Orleans, LA',
  //     destination: 'New York, NY'
  //   }
  // ];

  constructor(private trips: TripsService) {}
  
  ngOnInit() {
    console.log('HIIIIIIIIIIIII');
    this.getAllTrips();
  }

  getAllTrips() {
    return this.trips.getAllTrips(this.currentUser)
    .subscribe((response: Object[]): void => {
      console.log('USERS TRIPS RESPONSE', response);
      response.forEach(element => {
        if(element[0].status === 'current'){
          this.current.push(element)
        } if (element[0].status === 'previous'){
          this.previous.push(element)
        } else if (element[0].status === 'upcoming'){
          this.upcoming.push(element)
        }
      });
      console.log('UPCOMING', this.upcoming,'CURRENT', this.current, 'PREVIOUS', this.previous);    
    })
  }
}
