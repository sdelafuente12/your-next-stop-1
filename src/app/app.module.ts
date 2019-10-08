import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { FavoritesComponent } from './favorites/favorites.component';
import { TripsComponent } from './trips/trips.component';
import { ResultsComponent } from './results/results.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ServiceWorkerModule } from '@angular/service-worker';
import { AppRoutingModule } from './app-routing.module';
import { environment } from '../environments/environment';
import { StartScreenComponent } from './start-screen/start-screen.component';
import { ExploreComponent } from './explore/explore.component';
import { RouteComponent } from './route/route.component';
import { DetailsComponent } from './details/details.component';
import { MapComponent } from './map/map.component';
import {
  IgxCardModule,
  IgxAvatarModule,
  IgxListModule,
  IgxBottomNavModule,
  IgxCarouselModule,
  IgxTabsModule,
  IgxIconModule,
  IgxInputGroupModule,
  IgxButtonModule,
  IgxRippleModule,
  IgxDatePickerModule,
  IgxTimePickerModule,
  IgxComboModule,
  IgxSelectModule,
  IgxAutocompleteModule,
  IgxChipsModule
} from 'igniteui-angular';
import { BottomNavRoutingComponent } from './bottomnav-routing/bottomnav-routing.component';
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
    ResultsComponent,
    BottomNavRoutingComponent
  ],
  imports: [
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
    IgxCardModule,
    IgxBottomNavModule,
    IgxSelectModule,
    RouterModule,
    AgmCoreModule.forRoot({
      apiKey: API_KEY
    }),
    AgmDirectionModule,
    IgxInputGroupModule,
    IgxCarouselModule,
    IgxButtonModule,
    IgxRippleModule,
    IgxTabsModule,
    IgxDatePickerModule,
    IgxTimePickerModule,
    IgxComboModule,
    IgxAutocompleteModule,
    IgxChipsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
