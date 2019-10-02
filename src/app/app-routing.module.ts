import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ExploreViewComponent } from './explore-view/explore-view.component';
import { StartScreenComponent } from './start-screen/start-screen.component';
import {
  BottomNavRoutingComponent,
  BottomNavRoutingView1Component,
  BottomNavRoutingView2Component,
  BottomNavRoutingView3Component,
  BottomNavRoutingView4Component
} from './bottomnav-routing/bottomnav-routing.component';

// const routes: Routes = [
//   { path: 'explore-view', component: ExploreViewComponent },
//   { path: '',
//     redirectTo: '/',
//     pathMatch: 'full'
//   },
// ];

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/bottomnav-routing'
  },
  {
    path: 'bottomnav-routing',
    component: BottomNavRoutingComponent,
    children: [
      { path: 'explore-view', component: ExploreViewComponent },
      { path: 'route-page', component: BottomNavRoutingView2Component },
      { path: 'trips-view', component: BottomNavRoutingView3Component },
      { path: 'favorites-view', component: BottomNavRoutingView4Component }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(
    routes
    )],
  exports: [RouterModule]
})
export class AppRoutingModule { }
