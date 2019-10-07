import { Component, OnInit } from '@angular/core';

import { environment } from '../../environments/environment';

@Component({
  selector: 'app-start-screen',
  templateUrl: './start-screen.component.html',
  styleUrls: ['./start-screen.component.scss']
})
export class StartScreenComponent implements OnInit {

  googleLoginUrl = `${environment.BASE_API_URL}/auth/google`;

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



