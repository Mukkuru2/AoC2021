import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-day10',
  templateUrl: './day10.component.html',
  styleUrls: ['./day10.component.css']
})
export class Day10Component implements OnInit {

  public ans1: any;
  public ans2: any;
  public ans1time: number = 0;
  public ans2time: number = 0;

  public readonly pairs = new Map<string, string>([
    ['[', ']'],
    ['<', '>'],
    ['{', '}'],
    ['(', ')']
  ])

  constructor() {
  }

  ngOnInit(): void {
    fetch("/assets/input10")
      .then(file => {
        return file.text()
      })
      .then(data => {
        this.main(data);
      });
  }

  private main(data: string) {
    const rows = data.split('\n').map(row => row.split('\r')[0]);
    rows.pop()
    let now = Date.now();
    this.partOne(rows);
    this.ans1time = Date.now() - now;
  }

  private partOne(rows: string[]) {
    let sum = 0;
    rows.forEach((row, index) => {
        const corrupt = this.checkCorrupt(row);
        if (corrupt !== undefined) {
          rows[index] = '';
        }
        sum += this.checkValue(corrupt, true);
      }
    )
    rows = rows.filter(row => row !== '');

    this.ans1 = sum;

    const now = Date.now();
    this.partTwo(rows);
    this.ans2time = Date.now() - now;

  }

  private partTwo(rows: string[]) {
    console.log(rows);
    let sums: number[] = [];
    rows.forEach((row, index) => {
        const unfinished = this.checkFinish(row);
        let sum = 0;
        while (unfinished.size() !== 0) {
          console.log(unfinished.peek())
          sum *= 5;
          sum += this.checkValue(this.pairs.get(<string>unfinished.pop()), false);
        };

        sums.push(sum);
      }
    )
    sums = sums.sort((a, b) => a > b ? 1 : -1);

    this.ans2 = sums[Math.floor(sums.length / 2)];
  }

  private checkCorrupt(row: string) {
    let commandStack = new Stack<string>()
    const corrupt = row.split('').find(command => {
      if (this.pairs.has(command)) {
        commandStack.push(command);
      } else {
        const topCommand = commandStack.peek();

        if (command === this.pairs.get(<string>topCommand)) {
          commandStack.pop();
        } else {
          return true;
        }

      }
      return false;
    })
    return corrupt;
  }

  private checkValue(command: any, corrupt: boolean) {
    switch (command) {
      case ')':
        return corrupt ? 3 : 1;
      case ']':
        return corrupt ? 57 : 2;
      case '}':
        return corrupt ? 1197 : 3;
      case '>':
        return corrupt ? 25137 : 4;
      default:
        return 0;
    }
  }

  private checkFinish(row: string) {
    let commandStack = new Stack<string>()
    row.split('').forEach(command => {
      if (this.pairs.has(command)) {
        commandStack.push(command);
      } else {
        const topCommand = commandStack.peek();
        if (command === this.pairs.get(<string>topCommand)) {
          commandStack.pop();
        }
      }
    })
    return commandStack;
  }
}

// Stack class from https://dev.to/glebirovich/typescript-data-structures-stack-and-queue-hld
class Stack<T> implements IStack<T> {
  private storage: T[] = [];

  constructor(private capacity: number = Infinity) {
  }

  push(item: T): void {
    if (this.size() === this.capacity) {
      throw Error("Stack has reached max capacity, you cannot add more items");
    }
    this.storage.push(item);
  }

  pop(): T | undefined {
    return this.storage.pop();
  }

  peek(): T | undefined {
    return this.storage[this.size() - 1];
  }

  size(): number {
    return this.storage.length;
  }
}

interface IStack<T> {
  push(item: T): void;

  pop(): T | undefined;

  peek(): T | undefined;

  size(): number;
}
