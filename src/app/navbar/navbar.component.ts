import {
  Location,
  LocationStrategy,
  PathLocationStrategy
} from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NavbarService } from '../services/navbar.service';
import { Observable } from 'rxjs';

const CURRENT_VIEW = 'Ignite UI for Angular';

@Component({
  providers: [
    Location,
    { provide: LocationStrategy, useClass: PathLocationStrategy }
  ],
  selector: 'app-navbar',
  styleUrls: ['./navbar.component.scss'],
  templateUrl: './navbar.component.html'
})
export class NavbarComponent implements OnInit {
  public currentView: Observable<string>;
  constructor(private _location: Location, private navbar: NavbarService) {}

  public ngOnInit() {
    this.currentView = this.navbar.title;
  }

  public navigateBack() {
    this._location.back();
  }

  public canGoBack() {
    return window.history.length > 0;
  }
}
