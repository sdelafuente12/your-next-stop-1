import { Component, OnInit } from '@angular/core';
import { styles } from './styles.js';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {
  lat: number;
  lng: number;
  styles = styles;
  origin;
  constructor() { }

  ngOnInit() {
    const options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0
    };
    navigator.geolocation.getCurrentPosition((position) => {
      this.lat = position.coords.latitude;
      this.lng = position.coords.longitude;
      this.origin = {
        lat: this.lat,
        lng: this.lng
      }
    }),
    (err) => {
      console.warn(`ERROR(${err.code}): ${err.message}`);
    },
    options
  }
  

}
