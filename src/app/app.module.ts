import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ServiceWorkerModule } from '@angular/service-worker';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { IgxBottomNavModule } from 'igniteui-angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { environment } from '../environments/environment';
import { StartScreenComponent } from './start-screen/start-screen.component';
import { ExploreViewComponent } from './explore-view/explore-view.component';
import { RoutePageComponent } from './route-page/route-page.component';
import { DetailsPageComponent } from './details-page/details-page.component';
import { MapComponent } from './map/map.component';

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
    //CommonModule,
    FormsModule,
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    BrowserAnimationsModule,
    IgxBottomNavModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
