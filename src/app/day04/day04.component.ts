import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-day04',
  templateUrl: './day04.component.html',
  styleUrls: ['./day04.component.css']
})
export class Day04Component implements OnInit {
  public ans1: any;
  public ans2: any;

  constructor() {
  }

  ngOnInit(): void {
    fetch("/assets/input4")
      .then(file => {
        return file.text()
      })
      .then(data => {
        this.main(data);
      });
  }

  private main(data: string) {

    let seq = data.split('\n')[0].split(',').map(str => parseInt(str));
    let boards: number[][][] = [[[]]];
    let rawBoards = data.split('\n').slice(2);
    let i = 0;
    rawBoards.forEach(row => {
      if (row === "") {
        i = 0;
        boards[boards.length] = [];
      } else {
        let _row = row.split(' ').filter(num => num !== '').map(num => parseInt(num));
        boards[boards.length - 1][i] = _row;
        i++;
      }
    })

    function TransformToBoard(board: number[][]) {
      let arr: number[][] = [];
      for (let i = 0; i < new Array(5).length; i++) {
        arr[i] = new Array(5).fill(0);
      }

      const brd: Board = {
        board: board,
        hitNumbers: arr,
        winTurns: 101
      }
      return brd;
    }

    let game: BingoGame = {
      sequence: seq,
      boards: boards.map(board => TransformToBoard(board))
    }

    //pop last board because its empty. Loses by default, problem of parser and file saving.
    game.boards.pop();
    this.partOneTwo(game);
  }


  private partOneTwo(game: BingoGame) {

    function hasBingo(board: Board): boolean {
      if (board.hitNumbers.some(row => row.every(x => x === 1))
        || board.hitNumbers[0]
                  .map((_, colIndex) => board.hitNumbers.map(row => row[colIndex]))
                  .some(row => row.every(x => x === 1))
        || board.hitNumbers.every((row, index) => board.hitNumbers[index][index] === 1)
        || board.hitNumbers.every((row, index) => board.hitNumbers[index][row.length - 1 - index] === 1)
      )
        return true

      return false;
    }

    function sumLeft(board: Board): number{
      const nums = board.hitNumbers.flat() as number[];
      const brd = board.board.flat() as number[];

      return brd.reduce((a: number, b: number, index) => {return nums[index] === 0 ? a + b : a}, 0)
    }

    game.boards.forEach(board => {
      for (let numbersDrawn = 0; numbersDrawn < game.sequence.length; numbersDrawn++){
        const drawnNumber = game.sequence[numbersDrawn];
        if (board.board.flat().includes(drawnNumber)) {
          const row = board.board.findIndex(row => row.includes(drawnNumber));
          const col = board.board[row].indexOf(drawnNumber);

          board.hitNumbers[row][col] = 1;

          if (hasBingo(board)) {

            board.winTurns = numbersDrawn;
            board.lastNumber = drawnNumber;
            break;
          }
        }
      }
    })

    let winBoard: Board = game.boards.reduce((_b, b) => _b.winTurns < b.winTurns ? _b : b);
    const left = sumLeft(winBoard);
    const last = winBoard.lastNumber ?? 0;
    this.ans1 = left * last;

    let lostBoard: Board = game.boards.reduce((_b, b) => _b.winTurns > b.winTurns ? _b : b);
    const leftLose = sumLeft(lostBoard);
    const lastLose = lostBoard.lastNumber ?? 0;
    this.ans2 = leftLose * lastLose;
  }
}


interface BingoGame {
  sequence: number[]
  boards: Board[]
}

interface Board {
  board: number[][],
  hitNumbers: number[][],
  winTurns: number,
  lastNumber?: number
}
