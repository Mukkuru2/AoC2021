import {Component, OnInit} from '@angular/core';
import {depths} from "./numbers";

@Component({
  selector: 'app-day01',
  templateUrl: './day01.component.html',
  styleUrls: ['./day01.component.css']
})
export class Exercise1Component implements OnInit {

  public nDeeper = 0;
  public nDeeperAvg = 0;

  constructor() {
  }

  ngOnInit(): void {
    let now = Date.now();
    this.partOne();
    console.log("Day 1 p1 took " + (Date.now() - now) + "ms")
    now = Date.now();
    this.partTwo();
    console.log("Day 1 p2 took " + (Date.now() - now) + "ms")
  }

  private partOne() {
    this.nDeeper = depths.filter((num, index) => {return index !== 0 && num > depths[index - 1]}).length;
  }

  private partTwo() {
    this.nDeeperAvg = depths.map((num, index) => {return num + depths[index + 1] + depths[index + 2]})
     .filter((num, index, list) => {return index !== 0 && num > list[index - 1]}).length;
  }
}
