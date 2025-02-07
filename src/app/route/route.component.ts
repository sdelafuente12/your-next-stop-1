
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
import { NavbarService } from '../services/navbar.service';


@Component({
  selector: 'app-route',
  templateUrl: './route.component.html',
  styleUrls: ['./route.component.scss']
})
export class RouteComponent implements OnInit, OnDestroy {
  @Output() public onClosing = new EventEmitter<string>();

  currentUser = localStorage.getItem('userId');
  parsedTrip = JSON.parse(localStorage.getItem('trip'));
  tripId = Number;

  form = {
    origin: '',
    destination: '',
    route: '', 
    waypoints: ['', '', '', '', ''],
    dateStart: new Date,
    dateEnd: new Date,
    userId: JSON.parse(this.currentUser),
  }
  
  private isoDate = {
    start: '',
    end: ''
  };
  public show = [0];
  public suggestions = [];

  public settings = {
    positionStrategy: new ConnectedPositioningStrategy({
      closeAnimation: null,
      openAnimation: null,
      verticalDirection: 0,
      verticalStartPoint: 0
    })
  };

  inputSubscription;
  categoryColor = false;
  
  constructor(
    private trips: TripsService,
    private route: RouteService,
    private router: PreviousRouteService,
    private navBar: NavbarService
  ) {}
  @ViewChild(MapComponent, { static: false }) public map: MapComponent;

  ngOnInit() {
    this.navBar.updateTitle('Route');
    const previousPage = this.router.getPreviousUrl();
    console.log('PASTTTTTT', previousPage);
    if (previousPage === '/route' && this.parsedTrip.length) {
      this.fromTripsSubmit();
    }
  }

  public onSubmit() {
    this.map.setRoute(this.form);
    // this.submitTrip(this.form);
    let formStorage = JSON.stringify(this.form);
    localStorage.setItem('form', formStorage)
    // console.log('@@form@@', localStorage.form)
  }
  
  public submitTrip(form) { 
    form.route = this.form.origin + ' -> ' + this.form.destination;
    form.waypoints = this.form.waypoints;
    // console.log('TRIP ID', this.tripId);
    // console.log('trip form being sent to ROUTE SERVICE', form);
    return this.route.saveTrips(form, this.tripId)
    .subscribe(userTrip => {
      console.log('Return from submitTrip function', userTrip);
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
            // console.log('FORMMMMM', this.form);
            if (field === 'origin') {
              return this.route.autoSuggestion(input, this.map.currentPosition);
            } else {
              return this.route.autoSuggestion(input, '')
            }}))
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
        this.form.dateStart = new Date(this.parsedTrip[0].dateStart);
        this.form.dateEnd = new Date(this.parsedTrip[0].dateEnd);
        this.form.userId = JSON.parse(this.currentUser);
        this.form.route = this.parsedTrip[0].route;
        this.form.waypoints = this.parsedTrip[0].wayPoints || [''];
        this.tripId = this.parsedTrip[0].id;
        console.log('Selected trip info from trip page that will populate this form', this.form);
        //console.log(this.map.setRoute);
        setTimeout(() => this.map.setRoute(this.form), 1000);
        // setTimeout(() => localStorage.removeItem('trip'), 1500);
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

    return `${month}/${day}/${year}`;
  }

  chooseCategory() {
    this.categoryColor = !this.categoryColor;
    console.log('choose category');
  }

  ngOnDestroy() {
    if (this.inputSubscription) {
      this.inputSubscription.unsubscribe();
    }
  }
}
