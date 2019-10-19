import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NavbarService {
  
  private navBarTitle = new BehaviorSubject<string>('');
  title = this.navBarTitle.asObservable();

  constructor() { }

  updatetitle(newTitle) {
    this.navBarTitle.next(newTitle);
  }
}
