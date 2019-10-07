import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-explore',
  templateUrl: './explore.component.html',
  styleUrls: ['./explore.component.scss']
})
export class ExploreComponent implements OnInit {

  constructor(private route: ActivatedRoute) {
    //console.log('roooooooo', this.route.snapshot.queryParams.username);
    localStorage.setItem('username', this.route.snapshot.queryParams.username);
  }

  ngOnInit() {
    
  }

}
