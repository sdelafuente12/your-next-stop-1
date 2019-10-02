import { FavoritesComponent } from './favorites/favorites.component';
import { TripsComponent } from './trips/trips.component';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { StartScreenComponent } from './start-screen/start-screen.component';
import { ExploreComponent } from './explore/explore.component';
import { RouteComponent } from './route/route.component';
import { DetailsComponent } from './details/details.component';
import { MapComponent } from './map/map.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { IgxAvatarModule } from 'igniteui-angular';
import { IgxIconModule } from 'igniteui-angular';
import { IgxListModule } from 'igniteui-angular';
import { IgxBottomNavModule } from 'igniteui-angular';
import { BottomNavRoutingComponent } from './bottomnav-routing/bottomnav-routing.component';
import { IgxGeographicMapModule } from 'igniteui-angular-maps/ES5/igx-geographic-map-module';
import { IgxDataChartInteractivityModule } from 'igniteui-angular-charts/ES5/igx-data-chart-interactivity-module';
import { AgmCoreModule } from '@agm/core';
import { AgmDirectionModule } from 'agm-direction';
import { API_KEY } from '../../config.js';

@NgModule({
  declarations: [
    AppComponent,
    StartScreenComponent,
    ExploreComponent,
    RouteComponent,
    DetailsComponent,
    MapComponent,
    TripsComponent,
    FavoritesComponent,
    BottomNavRoutingComponent,
  ],
  imports: [
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
    IgxGeographicMapModule,
    IgxDataChartInteractivityModule,
    RouterModule,
    AgmCoreModule.forRoot({
      apiKey: API_KEY
    }),
    AgmDirectionModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
