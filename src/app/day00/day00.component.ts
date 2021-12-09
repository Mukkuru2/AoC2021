import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-day00',
  templateUrl: './day00.component.html',
  styleUrls: ['./day00.component.css']
})
export class Day00Component implements OnInit {

  public ans1: any;
  public ans2: any;
  public ans1time: number = 0;
  public ans2time: number = 0;

  constructor() { }

  ngOnInit(): void {
    fetch("/assets/input")
      .then(file => {
        return file.text()
      })
      .then(data => {
        this.main(data);
      });
  }

  private main(data: string){

  }

}
