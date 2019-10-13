
import { Component, OnInit, ViewChild, OnDestroy, Output, EventEmitter } from '@angular/core';
import { TripsService } from '../services/trips.service';
import { MapComponent } from '../map/map.component';
import { DynamicInputComponent } from './dynamic-input/dynamic-input.component';
import { RouteService } from '../services/route.service';
import { PreviousRouteService } from '../services/router.service';
import { 
  ConnectedPositioningStrategy, 
} from 'igniteui-angular';
import { debounceTime, switchMap } from 'rxjs/operators';
import { from } from 'rxjs';
import { ThrowStmt } from '@angular/compiler';


@Component({
  selector: 'app-route',
  templateUrl: './route.component.html',
  styleUrls: ['./route.component.scss']
})


export class RouteComponent implements OnInit, OnDestroy {

  @Output() public onClosing = new EventEmitter<string>();

  currentUser = localStorage.getItem('userId');
  parsedTrip = JSON.parse(localStorage.getItem('trip'));

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
  constructor(private trips: TripsService, private route: RouteService, private router: PreviousRouteService) {}
  @ViewChild(MapComponent, {static: false}) public map: MapComponent;
  
  ngOnInit() {
    const previousPage = this.router.getPreviousUrl();
    console.log('PASTTTTTT', previousPage);
    if (previousPage === '/trips') {
      this.fromTripsSubmit();
    }
  }
  
  public onSubmit() {
    this.map.setRoute(this.form);
    this.submitTrip(this.form);
    let formStorage = JSON.stringify(this.form);
    localStorage.setItem('form', formStorage)
    console.log('@@form@@', localStorage.form)
  }
  
  public submitTrip(form) { 
    this.form.route = this.form.origin + ' -> ' + this.form.destination;
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

      public fromTripsSubmit() {
        console.log('PARSLEY', this.parsedTrip);
        this.form.origin = this.parsedTrip[0].route.split('->')[0];
        this.form.destination = this.parsedTrip[0].route.split('-> ')[1];
        this.form.dateStart = this.parsedTrip[0].dateStart;
        this.form.dateEnd = this.parsedTrip[0].dateEnd;
        this.form.userId = JSON.parse(this.currentUser);
        this.form.route = this.parsedTrip[0].route;
        console.log('FORMMMMMM', this.form);
        //console.log(this.map.setRoute);
        setTimeout(() => this.map.setRoute(this.form), 2000);
        
      }
      
      
      ngOnDestroy() {
        if (this.inputSubscription) { this.inputSubscription.unsubscribe(); }
      }
    }
