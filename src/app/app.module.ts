import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { FavoritesComponent } from './favorites/favorites.component';
import { TripsComponent } from './trips/trips.component';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { StartScreenComponent } from './start-screen/start-screen.component';
import { ExploreComponent } from './explore/explore.component';
import { RouteComponent } from './route/route.component';
import { DetailsComponent } from './details/details.component';
import { MapComponent } from './map/map.component';
import { IgxCardModule, IgxAvatarModule, IgxIconModule, IgxListModule, IgxBottomNavModule } from 'igniteui-angular';
import { BottomNavRoutingComponent } from './bottomnav-routing/bottomnav-routing.component';
import { AgmCoreModule } from '@agm/core';
import { AgmDirectionModule } from 'agm-direction';
import { API_KEY } from '../../config.js';
import 'hammerjs';
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
    IgxCardModule,
    IgxBottomNavModule,
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
