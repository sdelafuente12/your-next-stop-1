
import { Component, OnInit, ViewChild } from '@angular/core';
import { TripsService } from '../services/trips.service';
import { MapComponent } from '../map/map.component'
import { RouteService } from '../services/route.service';
import { 
  ConnectedPositioningStrategy, 
  IgxInputGroupComponent 
} from 'igniteui-angular';
import { debounceTime, switchMap, filter } from 'rxjs/operators';
import { from } from 'rxjs';

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
  public suggestions = [];
  
  public settings = {
    positionStrategy: new ConnectedPositioningStrategy({
        closeAnimation: null,
        openAnimation: null,
        verticalDirection: 0,
        verticalStartPoint: 0
    })
}

  constructor(private trips: TripsService, private route: RouteService) {
    // this.suggestions = ['a', 'ab', 'abc']
  }
  @ViewChild(MapComponent, {static: false}) private map: MapComponent;
  @ViewChild('originGroup', { read: IgxInputGroupComponent, static: true }) inputGroup: IgxInputGroupComponent;
  ngOnInit() {
    
  }

  public onSubmit() {
    this.map.setRoute(this.form);
  }

  public onKey(field, input: string) {
    if (input.length) {
      from(input)
      .pipe(
        debounceTime(250),
        switchMap(
          input => this.route.autoSuggestion(input, this.map.currentPosition)
        )
      )
      .subscribe((suggestions: any) => {
        console.log(suggestions)
        this.suggestions = suggestions;
      })
    }
  }
    // console.log(input)
    // this.route.autoSuggestion(input, this.map.currentPosition)
    //   .subscribe((suggestions: any) => {
    //     console.log(suggestions)
    //     this.suggestions = suggestions.predictions;
    //   })
  
}
