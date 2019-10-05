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
    fullName: undefined,
  };

  public onDateSelection(value) {
    this.user.dateTime.setDate((value as Date).getDate());
  }

  public onSubmit() {
  }

  ngOnInit() {
  }

  
}
