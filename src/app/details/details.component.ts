import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {
  newColor = false;
  constructor() { }
  
  toggleColor() {
    this.newColor = !this.newColor;
    console.log('color change')
  }
  ngOnInit() {
  }

}
