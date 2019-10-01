import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { StartScreenComponent } from './start-screen/start-screen.component';
import { RouterModule, Routes } from '@angular/router';
import { ExploreViewComponent } from './explore-view/explore-view.component';
import { RoutePageComponent } from './route-page/route-page/route-page.component';
import { DetailsPageComponent } from './details-page/details-page/details-page.component';
import { MapComponent } from './route-page/map/map.component';


@NgModule({
  declarations: [
    AppComponent,
    StartScreenComponent,
    ExploreViewComponent,
    RoutePageComponent,
    DetailsPageComponent,
    MapComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
