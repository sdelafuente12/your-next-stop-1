import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-places',
  templateUrl: './places.component.html',
  styleUrls: ['./places.component.scss']
})
export class PlacesComponent implements OnInit {

  newColor = false;

  constructor() {}

  ngOnInit() {}

  toggleColor() {
    this.newColor = !this.newColor;
    console.log('color change');
  }
  
}
