import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { Exercise1Component } from './day01/day01.component';
import { Day02Component } from './day02/day02.component';
import { Day03Component } from './day03/day03.component';
import { Day04Component } from './day04/day04.component';
import { Day00Component } from './day00/day00.component';
import { Day05Component } from './day05/day05.component';
import { Day06Component } from './day06/day06.component';
import { Day07Component } from './day07/day07.component';
import { Day08Component } from './day08/day08.component';
import { Day09Component } from './day09/day09.component';

@NgModule({
  declarations: [
    AppComponent,
    Exercise1Component,
    Day02Component,
    Day03Component,
    Day04Component,
    Day00Component,
    Day05Component,
    Day06Component,
    Day07Component,
    Day08Component,
    Day09Component
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
