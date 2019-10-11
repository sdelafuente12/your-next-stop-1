
import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { TripsService } from '../services/trips.service';
import { MapComponent } from '../map/map.component';
import { DynamicInputComponent } from './dynamic-input/dynamic-input.component';
import { RouteService } from '../services/route.service';
import { 
  ConnectedPositioningStrategy, 
} from 'igniteui-angular';
import { debounceTime, switchMap } from 'rxjs/operators';
import { from } from 'rxjs';


@Component({
  selector: 'app-route',
  templateUrl: './route.component.html',
  styleUrls: ['./route.component.scss']
})
export class RouteComponent implements OnInit, OnDestroy {
  currentUser = localStorage.getItem('userId');
  form = {
    origin: '',
    destination: '',
    route: '', 
    waypoints: '',
    dateStart: '',
    dateEnd: '',
    userId: JSON.parse(this.currentUser),
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
inputSubscription;
  constructor(private trips: TripsService, private route: RouteService) {}
  @ViewChild(MapComponent, {static: false}) private map: MapComponent;
  
  ngOnInit() {
    
  }

  public onSubmit() {
    this.map.setRoute(this.form);
    this.submitTrip(this.form);
  }

  public submitTrip(form) { 
    this.form.route = this.form.origin + this.form.destination;
    return this.route.saveTrips(form)
      .subscribe(userTrip => {
        console.log(userTrip);
      })
  }

  public onKey(field) {
    
    if (this.form[field].length) {
      this.inputSubscription = from(this.form[field])
      .pipe(
        debounceTime(250),
        switchMap(
          (input) => {
            console.log('FORMMMMM', this.form);
            if (field === 'origin') {
              return this.route.autoSuggestion(this.form[field], this.map.currentPosition)
            } else {
              return this.route.autoSuggestion(this.form[field], '')
            }
            
          }  
        )
      )
      .subscribe((suggestions: any) => {
        // console.log(suggestions)
        this.suggestions = suggestions;
      })
    }
  }

  public onClick() {
    this.suggestions = [];
    if (this.inputSubscription) { this.inputSubscription.unsubscribe(); }
  }
 
  public onDateSelection(value) {
    if(value === 'startValue') {
      this.form.dateStart = value;
    }
    this.form.dateEnd = value;
    console.log(this.form.dateEnd);
  }
  public autosuggestClick(suggestion) {

  }

  
  ngOnDestroy() {
    if (this.inputSubscription) { this.inputSubscription.unsubscribe(); }
  }
}
