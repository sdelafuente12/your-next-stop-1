import { Component } from '@angular/core';

@Component({
  selector: 'app-bottomnav-routing',
  styleUrls: ['bottomnav-routing.component.scss'],
  templateUrl: 'bottomnav-routing.component.html'
})
export class BottomNavRoutingComponent {
  constructor() {}
}

@Component({
  template: '<h3>Explore Content</h3>'
})
export class BottomNavRoutingView1Component {}

@Component({
  template: '<h3>Route Content</h3>'
})
export class BottomNavRoutingView2Component {}

@Component({
  template: '<h3>Trips Content</h3>'
})
export class BottomNavRoutingView3Component {}

@Component({
  template: '<h3>Favorites Content</h3>'
})
export class BottomNavRoutingView4Component {}