import { RouteComponent } from './route/route.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ExploreComponent } from './explore/explore.component';
import { StartScreenComponent } from './start-screen/start-screen.component';
import { TripsComponent } from './trips/trips.component';
import { FavoritesComponent } from './favorites/favorites.component';
import { ResultsComponent } from './results/results.component';
import { DetailsComponent } from './details/details.component';
import {
  BottomNavRoutingComponent,
} from './bottomnav-routing/bottomnav-routing.component';

const routes: Routes = [
  {
    path: 'bottomnav-routing',
    component: BottomNavRoutingComponent
  },
  { path: 'explore', component: ExploreComponent },
  { path: 'route', component: RouteComponent },
  { path: 'trips', component: TripsComponent },
  { path: 'favorites', component: FavoritesComponent },
  { path: 'explore/results', component: ResultsComponent },
<<<<<<< HEAD
=======
  { path: 'details', component: DetailsComponent },
>>>>>>> 6a7d786f63e8cd9e83b8ea0e2c4ffc8e5ec23d28
  {
    path: '',
    component: StartScreenComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(
    routes
    )],
  exports: [RouterModule]
})
export class AppRoutingModule { }
