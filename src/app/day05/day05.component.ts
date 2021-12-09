import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-day05',
  templateUrl: './day05.component.html',
  styleUrls: ['./day05.component.css']
})
export class Day05Component implements OnInit {

  public ans1: any;
  public ans2: any;
  public ans1time: number = 0;
  public ans2time: number = 0;

  constructor() {
  }

  ngOnInit(): void {
    fetch("/assets/input5")
      .then(file => {
        return file.text()
      })
      .then(data => {
        this.main(data);
      });
  }

  private main(data: string) {
    let now = Date.now();
    let lines: number[][] = [];
    for (let i = 0; i < new Array(1000).length; i++) {
      lines[i] = new Array(1000).fill(0);
    }

    let diagonals: number[][] = [];
    for (let i = 0; i < new Array(1000).length; i++) {
      diagonals[i] = new Array(1000).fill(0);
    }

    let commands = data.split('\n')
      .map(command => {
        let coordinatesArray = command.split('->')
          .map(coordinates => coordinates.replace(' ', '').replace('\r', '')
            .split(','))
          .flat()
          .map(str => parseInt(str));

        return coordinatesArray;
      })
    commands.pop();

    commands.forEach(command => {
      this.fillLine(lines, command, false);
    })

    commands.forEach(command => {
      this.fillLine(diagonals, command, true);
    })

    this.ans1 = this.count(lines);
    this.ans1time = Date.now() - now;
    this.ans2 = this.count(diagonals);
    this.ans2time = Date.now() - now;
  }

  private fillLine(field: number[][], coordinates: number[], diagonal: boolean) {
    let x1 = coordinates[0], x2 = coordinates[2], y1 = coordinates[1], y2 = coordinates[3];

    let smallestX = Math.min(x1, x2);
    let largestX = Math.max(x1, x2);
    let smallestY = Math.min(y1, y2);
    let largestY = Math.max(y1, y2);

    let difference = Math.max(largestY - smallestY, largestX - smallestX);

    for (let i = 0; i <= difference; i++) {
      if (x1 === x2) {
        field[smallestX][smallestY + i]++;
      } else if (y1 === y2) {
        field[smallestX + i][smallestY]++;
      } else if (diagonal) {
        if (x1 - x2 === y1 - y2)
          field[smallestX + i][smallestY + i]++;
        else
          field[smallestX + i][largestY - i]++;
      }
    }
  }

  private count(lines: number[][]) {
    return lines.flat().filter(x => x > 1).length;
  }
}
