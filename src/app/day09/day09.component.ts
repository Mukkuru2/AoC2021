import {Component, OnInit} from '@angular/core';
import {max} from 'rxjs/operators';

@Component({
  selector: 'app-day09',
  templateUrl: './day09.component.html',
  styleUrls: ['./day09.component.css']
})
export class Day09Component implements OnInit {

  public ans1: any;
  public ans2: any;
  public ans1time: number = 0;
  public ans2time: number = 0;

  constructor() {
  }

  ngOnInit(): void {
    fetch("/assets/input9")
      .then(file => {
        return file.text()
      })
      .then(data => {
        this.main(data);
      });
  }

  private main(data: string) {

    const field = data.split('\n').map(row => row.split('').map(number => parseInt(number)));
    field.pop()
    let now = Date.now();
    this.partOne(field);
    this.ans1time = Date.now() - now;
    now = Date.now();
    this.partTwo(field);
    this.ans2time = Date.now() - now;
  }

  private partOne(field: number[][]) {
    const lowestPoints = field.map((row, y) => row.map((number, x) => this.isLow(x, y, field) ? number : -1))
    const sum = lowestPoints.flat().reduce((a, b) => a + 1 + b) + 1;
    this.ans1 = sum;
  }

  private partTwo(field: number[][]) {
    const noWalls = field.map(row => row.map(num => num === 9 ? -1 : num))
    const largest = [0, 0, 0]
    for (let y = 0; y < noWalls.length; y++) {
      const row = noWalls[y];
      for (let x = 0; x < row.length; x++) {
        const num = row[x];
        if (num === -1) {
          continue;
        }
        const numBasin = this.countBasin(x, y, noWalls);
        if (numBasin > Math.min(...largest)) {
          console.log('larger!');
          largest.find((x, index) => {
            if (x === Math.min(...largest)) {
              largest[index] = numBasin;
              return true;
            }
            return false;
          });
        }
      }
    }
    this.ans2 = largest.reduce((a, b) => a * b);
  }

  private isLow(x: number, y: number, field: number[][]) {
    const p = field[y][x];

    const left = x > 0 ? field[y][x - 1] > p : true
    const right = x < field[0].length - 1 ? field[y][x + 1] > p : true
    const up = y > 0 ? field[y - 1][x] > p : true
    const down = y < field.length - 1 ? field[y + 1][x] > p : true

    if (left && right && up && down) {
      return true
    }
    return false;
  }

  private countBasin(x: number, y: number, field: number[][]): number {
    let sum = 1;
    field[y][x] = -1;

    const left = x > 0 ? field[y][x - 1] !== -1 : false
    sum += left ? this.countBasin(x - 1, y, field) : 0
    const right = x < field[0].length - 1 ? field[y][x + 1] !== -1 : false
    sum += right ? this.countBasin(x + 1, y, field) : 0
    const up = y > 0 ? field[y - 1][x] !== -1 : false
    sum += up ? this.countBasin(x, y - 1, field) : 0
    const down = y < field.length - 1 ? field[y + 1][x] !== -1 : false
    sum += down ? this.countBasin(x, y + 1, field) : 0

    return sum;

  }
}
