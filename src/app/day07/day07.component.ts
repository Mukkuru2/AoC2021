import {Component, OnInit} from '@angular/core';
// import aocLoader from 'aoc-loader';
// import { sessionCookie } from ''

@Component({
  selector: 'app-day07',
  templateUrl: './day07.component.html',
  styleUrls: ['./day07.component.css']
})
export class Day07Component implements OnInit {

  public ans1: any;
  public ans2: any;

  constructor() {
  }

  ngOnInit(): void {
    // aocLoader(2021, 7, )
    fetch("/assets/input7")
      .then(file => {
        return file.text()
      })
      .then(data => {
        this.main(data);
      });
  }

  private main(data: string) {

    this.partOne(data);
    this.partTwo(data);
  }


  private partOne(data: string) {
    let nums = data.split(',').map(x => parseInt(x))
    let max = Math.max(...nums);
    let min = Math.min(...nums);

    let least = Infinity;
    for (let i = min; i < max; i++) {
      let c = 0;
      nums.forEach(x => {
        c += Math.abs(x - i);
      })
      least = c < least ? c : least;
    }

    this.ans1 = least;
  }

  private partTwo(data: string) {
    let nums = data.split(',').map(x => parseInt(x))
    let max = Math.max(...nums);
    let min = Math.min(...nums);


    const triangular = function (value:number) {
      var abs = Math.abs(value);
      return ((abs / 2) * (abs + 1)) * (abs / value) || 0;
    };

    let least = Infinity;
    for (let i = min; i < max; i++) {
      let c = 0;
      nums.forEach(x => {
        c += triangular(Math.abs(x - i));
      })
      least = c < least ? c : least;
    }

    this.ans2 = least;
  }
}
