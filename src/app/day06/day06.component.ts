import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-day06',
  templateUrl: './day06.component.html',
  styleUrls: ['./day06.component.css']
})
export class Day06Component implements OnInit {

  public ans1: any;
  public ans2: any;

  constructor() {
  }

  ngOnInit(): void {
    fetch("/assets/input6")
      .then(file => {
        return file.text()
      })
      .then(data => {
        this.main(data);
      });
  }

  private main(data: string) {
    let fishies: number[] = data.split(',').map(str => parseInt(str));

    for (let i = 0; i < 80; i++) {
      let add: number[] = [];
      fishies = fishies.map((fish) => {
        if (fish === 0) {
          add.push(8);
          return 6;
        } else {
          return fish - 1;
        }
      })
      fishies = fishies.concat(add);
    }
    this.ans1 = fishies.length;

    let fishies2: number[] = data.split(',').map(str => parseInt(str));
    let fishAmount: number[][] = [];
    fishies2.forEach(x => {
      let amount = fishAmount[x] || []
      let value = amount[1] ?? 0;
      fishAmount[x] = [x, value + 1];
    })

    for (let i = 0; i < 256; i++) {
      let add: number[][] = [[8, 0]];
      fishAmount = fishAmount.map(fish => {
        if (fish[0] === 0) {
          add[0][1] += fish[1];
          return [6, fish[1]];
        } else {
          return [fish[0] - 1, fish[1]]
        }
      })
      fishAmount = fishAmount.concat(add);
      fishAmount = fishAmount.map(fish => {
        let fishesWithAmount = fishAmount.filter(fish2 => fish2[0] === fish[0])
        if (fishesWithAmount.length > 1) {
          return fishesWithAmount.reduce((amt1, amt2) => [amt1[0], amt1[1] + amt2[1]]);
        } else return fish;
      })

      fishAmount = fishAmount.filter(fish => {
        return fishAmount.filter(fish2 => fish2[0] === fish[0]).length <= 1 || fish === fishAmount.filter(fish2 => fish2[0] === fish[0])[0];
      })
    }

    this.ans2 = fishAmount.reduce((fish, fish2) => [fish[0], fish[1] + fish2[1]])[1];
  }
}

