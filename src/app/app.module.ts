import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';
import { FormsModule }   from '@angular/forms';

import { WeatherService } from "./weather.service";
import {LocationService} from './location.service';
import { AppComponent } from './app.component';
import { CardComponent } from './card/card.component';
import { HttpClientModule } from '@angular/common/http';
import '@angular/common/locales/global/ru';

@NgModule({
  declarations: [
    AppComponent,
    CardComponent
  ],
  imports: [
    BrowserModule, FormsModule, HttpClientModule
  ],
  providers: [{ provide: LOCALE_ID, useValue: "ru" }, LocationService, WeatherService],
  bootstrap: [AppComponent]
})
export class AppModule { }
