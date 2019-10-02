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
  template: '<h3>Tab 1 Content</h3>'
})
export class BottomNavRoutingView1Component {}

@Component({
  template: '<h3>Tab 2 Content</h3>'
})
export class BottomNavRoutingView2Component {}

@Component({
  template: '<h3>Tab 3 Content</h3>'
})
export class BottomNavRoutingView3Component {}

@Component({
  template: '<h3>Tab 4 Content</h3>'
})
export class BottomNavRoutingView4Component {}