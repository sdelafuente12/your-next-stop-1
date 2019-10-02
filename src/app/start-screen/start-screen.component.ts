import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-start-screen',
  templateUrl: './start-screen.component.html',
  styleUrls: ['./start-screen.component.scss']
})
export class StartScreenComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}



// import { Component, OnInit } from '@angular/core';
// import { AuthService } from '../services/auth.service';

// @Component({
//   selector: 'app-start-screen',
//   templateUrl: './start-screen.component.html',
//   styleUrls: ['./start-screen.component.scss']
// })
// export class StartScreenComponent implements OnInit {

//   username = '';
  
//   constructor(private auth: AuthService) { }

//   ngOnInit() {
//   }

//   createUser() {
//     console.log('USERNAME', this.username);
//     this.auth.createUser({ username: this.username }).subscribe(user => {
//       console.log('user from user service', user);
//     })
//   }

  // createTrip() {
  //   console.log('TRIP NAME', this.tripname);
  //   this.trips.createTrip({ tripname: this.tripname }).subscribe(trip => {
  //     console.log('user from user service', trip);
  //   })
  // }



