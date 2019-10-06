import { Component, HostBinding } from '@angular/core';

@Component({
  selector: 'app-bottomnav-routing',
  styleUrls: ['bottomnav-routing.component.scss'],
  templateUrl: 'bottomnav-routing.component.html'
})
export class BottomNavRoutingComponent {
  @HostBinding("class")
  public themesClass = "dark-theme";
  constructor() {}
}