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
import { ExploreViewComponent } from './explore-view/explore-view.component';
import { RoutePageComponent } from './route-page/route-page.component';
import { DetailsPageComponent } from './details-page/details-page.component';
import { MapComponent } from './map/map.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { IgxAvatarModule } from 'igniteui-angular';
import { IgxIconModule } from 'igniteui-angular';
import { IgxListModule } from 'igniteui-angular';
import { IgxBottomNavModule } from 'igniteui-angular';
import { BottomNavRoutingComponent } from './bottomnav-routing/bottomnav-routing.component';
import { IgxGeographicMapModule } from 'igniteui-angular-maps/ES5/igx-map-module';
import { IgxDataChartInteractivityModule } from 'igniteui-angular-charts/ES5/igx-data-chart-interactivity-module';

@NgModule({
  declarations: [
    AppComponent,
    StartScreenComponent,
    ExploreViewComponent,
    RoutePageComponent,
    DetailsPageComponent,
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
    RouterModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
