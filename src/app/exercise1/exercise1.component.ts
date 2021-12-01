import {Component, OnInit} from '@angular/core';
import {numberListExercise1} from "./numbers";

@Component({
  selector: 'app-exercise1',
  templateUrl: './exercise1.component.html',
  styleUrls: ['./exercise1.component.css']
})
export class Exercise1Component implements OnInit {

  public numDepthIncreased = 0;
  public numDepthIncreasedSlidingWindow = 0;

  constructor() {
  }

  ngOnInit(): void {
    this.partOne();
    this.partTwo();
  }

  private partOne() {
    let depthList = numberListExercise1;

    let increasingDepth = depthList.filter((num, index) => {
      return index !== 0 && num > depthList[index - 1]
      });

    this.numDepthIncreased = increasingDepth.length;
  }

  private partTwo() {
    let depthList = numberListExercise1;

    let adjustedDepthList = depthList.map((num, index) => {return num + depthList[index + 1] + depthList[index + 2]});

    let increasingDepth = adjustedDepthList.filter((num, index) => {
      return index !== 0 && num > adjustedDepthList[index - 1]
    });

    this.numDepthIncreasedSlidingWindow = increasingDepth.length;
  }
}
