import { RoutePageComponent } from './route-page/route-page.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ExploreViewComponent } from './explore-view/explore-view.component';
import { StartScreenComponent } from './start-screen/start-screen.component';
import { TripsComponent } from './trips/trips.component';
import { FavoritesComponent } from './favorites/favorites.component';
import {
  BottomNavRoutingComponent,
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
    path: 'bottomnav-routing',
    component: BottomNavRoutingComponent,
  },
  { path: 'explore-view', component: ExploreViewComponent },
  { path: 'route-page', component: RoutePageComponent },
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
