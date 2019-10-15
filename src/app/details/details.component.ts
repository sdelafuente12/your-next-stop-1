import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ActivatedRoute, ParamMap } from '@angular/router'
import { map, take } from 'rxjs/operators';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {
  newColor = false;
  state$: Observable<object>;
  placeId: string;
  constructor(public activatedRoute: ActivatedRoute) { }
  
  toggleColor() {
    this.newColor = !this.newColor;
    console.log('color change')
  }
  ngOnInit() {
    this.state$ = this.activatedRoute.paramMap
      .pipe(
        map((value) => this.placeId = window.history.state),
        take(1)
        )
    this.state$.subscribe(state => console.log('state', state))
  }

}
