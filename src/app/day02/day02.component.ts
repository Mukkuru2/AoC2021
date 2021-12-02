import {Component, OnInit} from '@angular/core';
import {commands} from "./commands";

@Component({
  selector: 'app-day02',
  templateUrl: './day02.component.html',
  styleUrls: ['./day02.component.css']
})
export class Day02Component implements OnInit {

  public product = 0;
  public aimProduct = 0;

  constructor() {
  }

  ngOnInit(): void {
    this.partOne();
    this.partTwo();
  }

  private partOne() {
    let sumCommands = {horizontal: 0, vertical: 0};
    commands.forEach(cmd => {
      sumCommands.horizontal += cmd.forward ?? 0;
      sumCommands.vertical -= cmd.up ?? 0;
      sumCommands.vertical += cmd.down ?? 0;
    })
    this.product = sumCommands.horizontal * sumCommands.vertical;
  }

  private partTwo() {
    let aim = 0;
    let sumCommands = {horizontal: 0, vertical: 0};
    commands.forEach(cmd => {
      aim -= cmd.up ?? 0;
      aim += cmd.down ?? 0;
      let forward = cmd.forward ?? 0
      sumCommands.horizontal += forward;
      sumCommands.vertical += forward * aim;

    })
    this.aimProduct = sumCommands.horizontal * sumCommands.vertical;
  }
}
