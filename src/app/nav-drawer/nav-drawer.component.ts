import { Component } from '@angular/core';

@Component({
  selector: 'app-nav-drawer',
  styleUrls: ['nav-drawer.component.scss'],
  templateUrl: 'nav-drawer.component.html'
})
export class NavDrawerComponent {
  constructor() {}

  logoutUser() {
    localStorage.removeItem('userId');
    window.location.href = '/';
  }
}