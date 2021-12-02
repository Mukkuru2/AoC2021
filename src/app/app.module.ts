import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { Exercise1Component } from './day01/day01.component';
import { Day02Component } from './day02/day02.component';

@NgModule({
  declarations: [
    AppComponent,
    Exercise1Component,
    Day02Component
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
