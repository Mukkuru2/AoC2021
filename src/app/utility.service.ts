import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilityService {

  private timer: number = 0;

  constructor() { }

  public async getInput(path: string){
    return new Promise<string>(resolve => fetch("/assets/" + path)
      .then(file => {
        return file.text()
      }).then(data => resolve(data)))
  }

  public startTimer(){
    this.timer = Date.now();
  }

  public getTime(): number{
    return Date.now() - this.timer;
  }
}
