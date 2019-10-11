import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.scss']
})
export class StatsComponent implements OnInit {
  nearbyPlaces = JSON.parse(localStorage.getItem('allUserNearbyPlaces'));

  constructor() { }

  ngOnInit() {
    console.log(this.nearbyPlaces);
  }    

}
