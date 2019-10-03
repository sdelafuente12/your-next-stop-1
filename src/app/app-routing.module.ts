import { RouteComponent } from './route/route.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ExploreComponent } from './explore/explore.component';
import { StartScreenComponent } from './start-screen/start-screen.component';
import { TripsComponent } from './trips/trips.component';
import { FavoritesComponent } from './favorites/favorites.component';
import {
  BottomNavRoutingComponent,
} from './bottomnav-routing/bottomnav-routing.component';


// const routes: Routes = [
//   { path: 'explore', component: ExploreComponent },
//   { path: '',
//     redirectTo: '/',
//     pathMatch: 'full'
//   },
// ];

const routes: Routes = [
  {
    path: 'bottomnav-routing',
    component: BottomNavRoutingComponent,
  },
  { path: 'explore', component: ExploreComponent },
  { path: 'route', component: RouteComponent },
  { path: 'trips', component: TripsComponent },
  { path: 'favorites', component: FavoritesComponent },
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
