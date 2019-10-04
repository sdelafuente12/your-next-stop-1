import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-trips',
  templateUrl: './trips.component.html',
  styleUrls: ['./trips.component.scss']
})
export class TripsComponent implements OnInit {
  constructor() {}
  public current = [];
  public upcoming = [
    {
      origin: 'New Orleans, LA',
      destination: 'Atlanta, GA'
    }
  ];
  public previous = [
    {
      origin: 'New Orleans, LA',
      destination: 'New York, NY'
    }
  ];
  ngOnInit() {}
}
