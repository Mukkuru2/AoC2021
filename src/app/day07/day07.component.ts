import {Component, OnInit} from '@angular/core';

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
    fetch("/assets/input7")
      .then(file => {
        return file.text()
      })
      .then(data => {
        this.main(data);
      });
  }

  private main(data: string) {
    let now = Date.now();
    this.partOne(data);
    console.log("Day 7 p1 took " + (Date.now() - now) + "ms")
    now = Date.now();
    this.partTwo(data);
    console.log("Day 7 p2 took " + (Date.now() - now) + "ms")
  }


  private partOne(data: string) {
    const nums = data.split(',').map(x => parseInt(x))
    const max = Math.max(...nums);
    const min = Math.min(...nums);

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
    const nums = data.split(',').map(x => parseInt(x))
    const max = Math.max(...nums);
    const min = Math.min(...nums);

    const triangular = function (value: number) {
      return ((value / 2) * (value + 1)) || 0;
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
