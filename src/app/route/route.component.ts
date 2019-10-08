
import { Component, OnInit, ViewChild } from '@angular/core';
import { TripsService } from '../services/trips.service';
import { MapComponent } from '../map/map.component'
import { RouteService } from '../services/route.service';

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


  constructor(private trips: TripsService, private route: RouteService) {}
  @ViewChild(MapComponent, {static: false}) private map: MapComponent;

  ngOnInit() {
  }

  public onSubmit() {
    this.map.setRoute(this.form);
  }

  public onKey(field, input) {
    console.log(input)
    this.route.autoSuggestion(input, this.map.currentPosition)
      .subscribe(suggestion => {
        if (field === 'origin') {
          
        }
      })
  }
}
