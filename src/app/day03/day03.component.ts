import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-day03',
  templateUrl: './day03.component.html',
  styleUrls: ['./day03.component.css']
})
export class Day03Component implements OnInit {

  public ans1 = 0;
  public ans2 = 0;

  constructor() {
  }

  ngOnInit(): void {
    fetch("/assets/input3")
      .then(file => {
        return file.text()
      })
      .then(data => {
        let now = Date.now();
        this.ans1 = this.partOne(data);
        console.log("Day 3 p1 took " + (Date.now() - now) + "ms")
        now = Date.now();
        this.ans2 = this.partTwo(data);
        console.log("Day 3 p2 took " + (Date.now() - now) + "ms")
      });
  }

  private partOne(input: string): number {
    return parseInt(input
      .split("\n")[0]
      .split('')
      .map((_, colIndex) => input.split("\n").map(row => row[colIndex]))
      .map((row) => row.filter(x => x === "1").length > row.filter(x => x === "0").length ? "1" : "0")
      .join(''), 2) * parseInt(input
      .split("\n")[0]
      .split('')
      .map((_, colIndex) => input.split("\n").map(row => row[colIndex]))
      .map((row) => row.filter(x => x === "1").length < row.filter(x => x === "0").length ? "1" : "0")
      .join(''), 2);
  }

  private partTwo(input: string): number {
    let oxygen: string[] = input
      .split("\n");
    let carbon: string[] = input
      .split("\n");

    let tOxygen;
    let tCarbon;
    let most: string[];
    let least: string[];
    for (let i = 0; i < oxygen[0].length; i++) {
      tOxygen = oxygen[0].split('')
        .map((_, colIndex) => oxygen.map(row => row[colIndex]));

      tCarbon = carbon[0].split('')
        .map((_, colIndex) => carbon.map(row => row[colIndex]));

      most = tOxygen.map((row) => row.filter(x => x === "1").length >= row.filter(x => x === "0").length ? "1" : "0");
      least = tCarbon.map((row) => row.filter(x => x === "1").length < row.filter(x => x === "0").length ? "1" : "0");

      oxygen = oxygen.filter(entry => entry.charAt(i) === most[i]);

      carbon = carbon.filter(entry => entry.charAt(i) === least[i]).length !== 0 ?
        carbon.filter(entry => entry.charAt(i) === least[i]) :
        carbon;


      //console.log(oxygen, most);
      // console.log(carbon, least);
    }
    return parseInt(oxygen.join(), 2) * parseInt(carbon.join(), 2);
  }
}
