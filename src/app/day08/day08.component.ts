import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-day08',
  templateUrl: './day08.component.html',
  styleUrls: ['./day08.component.css']
})
export class Day08Component implements OnInit {

  public ans1: any;
  public ans2: any;
  public ans1time: number = 0;
  public ans2time: number = 0;

  private readonly DIGITS = [['a', 'b', 'c', 'e', 'f', 'g'],
    ['c', 'f'],
    ['a', 'c', 'd', 'e', 'g'],
    ['a', 'c', 'd', 'f', 'g'],
    ['b', 'c', 'd', 'f'],
    ['a', 'b', 'd', 'f', 'g'],
    ['a', 'b', 'd', 'e', 'f', 'g'],
    ['a', 'c', 'f'],
    ['a', 'b', 'c', 'd', 'e', 'f', 'g'],
    ['a', 'b', 'c', 'd', 'f', 'g']]

  constructor() {
  }

  ngOnInit(): void {
    fetch("/assets/input8")
      .then(file => {
        return file.text()
      })
      .then(data => {
        this.main(data);
      });
  }

  private main(data: string) {
    const commands = data.split("\n");
    commands.pop();
    let now = Date.now()
    this.partOne(commands);
    this.ans1time = Date.now() - now;
    now = Date.now()
    this.partTwo(commands);
    this.ans2time = Date.now() - now;
  }

  private partOne(commands: string[]) {
    const commandsOutput = commands.map(command => command.split("|")[1])
    const numDigits = commandsOutput.map(command => command.split(" ").filter(digit => digit.length === 2 || digit.length === 3 || digit.length === 4 || digit.length === 7)).flat().length;
    this.ans1 = numDigits;
  }

  private partTwo(commands: string[]) {

    this.ans2 = 0;

    commands.forEach(command => {

      const input = command.split("|")[0].trim().split(" ");
      const output = command.split("|")[1].trim().split(" ");

      const digits = input;
      const elementsMap: Map<string, string> = new Map<string, string>();
      const one = digits.filter(digit => digit.length == 2)[0].split('');
      const seven = digits.filter(digit => digit.length == 3)[0].split('');
      const four = digits.filter(digit => digit.length == 4)[0].split('');
      const eight = digits.filter(digit => digit.length == 7)[0].split('');
      const twoThreeFive = digits.filter(digit => digit.length == 5).map(x => x.split(''));
      const zeroSixNine = digits.filter(digit => digit.length == 6).map(x => x.split(''));

      elementsMap.set("a", this.differenceArrays(one, seven)[0]);

      const twoFive = [twoThreeFive.filter(digit => this.differenceArrays(digit, twoThreeFive[0]).length >= 2),
        twoThreeFive.filter(digit => this.differenceArrays(digit, twoThreeFive[1]).length >= 2),
        twoThreeFive.filter(digit => this.differenceArrays(digit, twoThreeFive[2]).length >= 2)]
        .filter(digit => digit.flat().length > 1).flat();

      const three = this.differenceArrays(twoThreeFive, twoFive).flat();

      const fourReduced = this.differenceArrays(four, one);
      const threeReduced = this.differenceArrays(three, one);

      elementsMap.set("d", this.differenceArrays(this.differenceArrays(threeReduced, fourReduced), threeReduced)[0]);

      const sixNine = zeroSixNine.filter(digit => digit.length === 6 && digit.includes(<string>elementsMap.get('d')));

      const f: string[] = sixNine.map(digit => this.overlapArrays(digit, one)).find(elements => elements.length === 1) ?? [];
      elementsMap.set('f', f[0]);

      const nine = sixNine.find(digit => digit.includes(this.differenceArrays(one, f)[0]))?.flat();

      elementsMap.set('c', this.differenceArrays(one, f)[0])

      const inverseBToFour = [
        elementsMap.get('d'),
        elementsMap.get('c'),
        elementsMap.get('f'),
      ]


      elementsMap.set('b', this.differenceArrays(inverseBToFour, four)[0]);
      // @ts-ignore
      elementsMap.set('e', this.differenceArrays(eight, nine)[0]);

      const allButG = [
        elementsMap.get('a'),
        elementsMap.get('b'),
        elementsMap.get('c'),
        elementsMap.get('d'),
        elementsMap.get('e'),
        elementsMap.get('f')
      ]

      elementsMap.set('g', this.differenceArrays(allButG, eight)[0]);

      //Reverse use the map function. Kinda stupid. I hate this code.
      const fixedOutput = output.map(digit => digit.split('').map(element => Array.from(elementsMap.entries())
        .filter(conversion => element === conversion[1])[0][0]));
      // @ts-ignore
      const numbers = fixedOutput.map(digit => this.getNumber(digit))

      this.ans2 += parseInt(numbers.join(''));
    })

  }

  private differenceArrays(elem1: any[], elem2: any[]) {
    let case1 = elem1.filter(entry => elem2.indexOf(entry) < 0)
    let case2 = elem2.filter(entry => elem1.indexOf(entry) < 0)
    return case1.length > case2.length ? case1 : case2;
  }

  private overlapArrays(elem1: any[], elem2: any[]) {
    return elem1.filter(n => elem2.indexOf(n) !== -1);
  }

  private getNumber(digit: string[]) {

    for (let index = 0; index < this.DIGITS.length; index++){
      const _digit = this.DIGITS[index];
      if (this.differenceArrays(digit, _digit).length === 0){
        return index;
      }
    }
    return -1;
  }
}
