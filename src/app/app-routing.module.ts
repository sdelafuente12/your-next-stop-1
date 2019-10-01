import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ExploreViewComponent } from './explore-view/explore-view.component';

const routes: Routes = [
  { path: 'explore-view', component: ExploreViewComponent },
  { path: '',
    redirectTo: '/',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(
    routes,
    { enableTracing: false }
    )],
  exports: [RouterModule]
})
export class AppRoutingModule { }
