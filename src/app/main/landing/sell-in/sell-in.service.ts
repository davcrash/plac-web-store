import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SellInService {

  scrollValue: Subject<any> = new Subject<any>();

  constructor() { }


  setScrollValue(value) {
    this.scrollValue.next(value);
  }

}
