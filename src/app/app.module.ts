import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ServiceWorkerModule } from '@angular/service-worker';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { environment } from '../environments/environment';
import { StartScreenComponent } from './start-screen/start-screen.component';
import { ExploreViewComponent } from './explore-view/explore-view.component';
import { RoutePageComponent } from './route-page/route-page.component';
import { DetailsPageComponent } from './details-page/details-page.component';
import { MapComponent } from './map/map.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { IgxAvatarModule } from 'igniteui-angular';
import { IgxIconModule } from 'igniteui-angular';
import { IgxListModule } from 'igniteui-angular';
import { IgxBottomNavModule } from 'igniteui-angular';
import { BottomNavRoutingComponent, BottomNavRoutingView1Component, BottomNavRoutingView2Component, BottomNavRoutingView3Component, BottomNavRoutingView4Component } from './bottomnav-routing/bottomnav-routing.component';

@NgModule({
  declarations: [
    AppComponent,
    StartScreenComponent,
    ExploreViewComponent,
    RoutePageComponent,
    DetailsPageComponent,
    MapComponent,
    BottomNavRoutingComponent,
    BottomNavRoutingView1Component,
    BottomNavRoutingView2Component,
    BottomNavRoutingView3Component,
    BottomNavRoutingView4Component
  ],
  imports: [
    //CommonModule,
    FormsModule,
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production
    }),
    BrowserAnimationsModule,
    IgxAvatarModule,
    IgxIconModule,
    IgxListModule,
    IgxBottomNavModule,
    RouterModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
