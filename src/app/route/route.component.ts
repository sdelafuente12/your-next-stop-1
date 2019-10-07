
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
  }

  public onSubmit() {
    this.map.setRoute(this.form);
  }
}
