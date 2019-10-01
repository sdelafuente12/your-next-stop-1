import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ExploreViewComponent } from './explore-view/explore-view.component';
import { StartScreenComponent } from './start-screen/start-screen.component';

const routes: Routes = [
  { path: 'explore-view', component: ExploreViewComponent },
  { path: '', component: StartScreenComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(
    routes,
    { enableTracing: false }
    )],
  exports: [RouterModule]
})
export class AppRoutingModule { }
