
import { Component, OnInit, ViewChild, OnDestroy, Output, EventEmitter } from '@angular/core';
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

  @Output() public onClosing = new EventEmitter<string>();

  currentUser = localStorage.getItem('userId');
  form = {
    origin: '',
    destination: '',
    route: '', 
    waypoints: ['', '', '', '', ''] ,
    dateStart: '',
    dateEnd: '',
    userId: JSON.parse(this.currentUser),
  }
  private isoDate = {
    start: '',
    end: ''
  }
  public show = [0];
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
    // this.submitTrip(this.form);
  }
  
  public submitTrip(form) { 
    this.form.route = this.form.origin + ';' + this.form.destination;
    return this.route.saveTrips(form)
    .subscribe(userTrip => {
      console.log(userTrip);
    })
  }

  public onKey(field, index) {
    let input;
    if (index) input = this.form[field][index];
    else input = this.form[field];
    
    if (input.length) {
      this.inputSubscription = from(input)
      .pipe(
        debounceTime(250),
        switchMap(
          (text) => {
            console.log('FORMMMMM', this.form);
            if (field === 'origin') {
              return this.route.autoSuggestion(input, this.map.currentPosition)
            } else {
              return this.route.autoSuggestion(input, '')
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
 
  public onDateSelection(event, startOrEnd, display) {
    console.log(startOrEnd, event, display)
    if(startOrEnd === 'start') {
      this.isoDate.start = JSON.stringify(event);
      this.form.dateStart = this.humanReadableDate(this.isoDate.start)
    }
    if(startOrEnd === 'end'){
      this.isoDate.end = JSON.stringify(event);
      this.form.dateEnd = this.humanReadableDate(this.isoDate.end)
    }
  }
  
  public autosuggestClick(suggestion) {

  }

  addWaypointInput() {
    this.show[this.show.length] = this.show.length;
  }

  removeWaypointInput(index) {
    if (index === 0) this.form.waypoints[0] = '';
    else this.show.splice(index, 1);
  }

  humanReadableDate(isoDate) {
    let day = isoDate.slice(9, 11);
    if (day[0] === '0') day = day.slice(1);
    let month = isoDate.slice(6, 8);
    if (month[0] === 0) month = month.slice(1);
    let year = isoDate.slice(1, 5);
    
    return `${month}/${day}/${year}`
  }

  ngOnDestroy() {
    if (this.inputSubscription) { this.inputSubscription.unsubscribe(); }
  }
}
