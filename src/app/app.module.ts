import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'

import { GoogleMapsModule } from '@angular/google-maps';
import { GooglemapComponent } from './googlemap/googlemap/googlemap.component'
import { GooglePlaceModule } from 'ngx-google-places-autocomplete';

@NgModule({
  declarations: [
    AppComponent,
    GooglemapComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    GoogleMapsModule,
    GooglePlaceModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
