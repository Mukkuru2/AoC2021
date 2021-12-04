import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { Exercise1Component } from './day01/day01.component';
import { Day02Component } from './day02/day02.component';
import { Day03Component } from './day03/day03.component';
import { Day04Component } from './day04/day04.component';
import { Day00Component } from './day00/day00.component';

@NgModule({
  declarations: [
    AppComponent,
    Exercise1Component,
    Day02Component,
    Day03Component,
    Day04Component,
    Day00Component
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
