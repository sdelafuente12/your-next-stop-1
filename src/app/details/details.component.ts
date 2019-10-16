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
  thumbColor = false;
  saveColor = false;
  state$: Observable<object>;
  placeId: string;
  constructor(public activatedRoute: ActivatedRoute) { }
  
  toggleThumb() {
    this.thumbColor = !this.thumbColor;
    console.log('thumb')
  }

  toggleSave() {
    this.saveColor = !this.saveColor;
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
