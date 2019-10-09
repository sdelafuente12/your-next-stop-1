import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-explore',
  templateUrl: './explore.component.html',
  styleUrls: ['./explore.component.scss']
})
export class ExploreComponent implements OnInit {

  currentUser = localStorage.getItem('username');

  constructor(private route: ActivatedRoute) {
    console.log('ROUTE', this.route.snapshot.queryParams.username);
  }

  ngOnInit() {
    const username = this.route.snapshot.queryParams.username;
    console.log('USERNAME', username)
    if (username) {
      localStorage.setItem('username', username);
    }
  }

}
