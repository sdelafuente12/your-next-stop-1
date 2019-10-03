import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ExploreComponent } from './explore/explore.component';
import { StartScreenComponent } from './start-screen/start-screen.component';
import {
  BottomNavRoutingComponent,
  BottomNavRoutingView1Component,
  BottomNavRoutingView2Component,
  BottomNavRoutingView3Component,
  BottomNavRoutingView4Component
} from './bottomnav-routing/bottomnav-routing.component';
import { RouteComponent } from './route/route.component';

// const routes: Routes = [
//   { path: 'explore', component: ExploreComponent },
//   { path: '',
//     redirectTo: '/',
//     pathMatch: 'full'
//   },
// ];

const routes: Routes = [
  { path: 'bottomnav-routing', component: BottomNavRoutingComponent },
  { path: 'explore', component: ExploreComponent },
  { path: 'route', component: RouteComponent },
  {
    path: '',
    component: StartScreenComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(
    routes
    )],
  exports: [RouterModule]
})
export class AppRoutingModule { }
