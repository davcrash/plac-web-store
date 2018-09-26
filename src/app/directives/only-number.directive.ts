import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[appOnlyNumber]'
})
export class OnlyNumberDirective {

  constructor() { }

  regexStr = '^[0-9]*$';
  @HostListener('keydown', ['$event']) onKeyDown(event) {
    let e = <KeyboardEvent>event;
    let numbersArray = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"];
    if ([46, 8, 9, 13].indexOf(e.keyCode) !== -1 ||
      (numbersArray.includes(e.key)) ||
      // Allow: Ctrl+A
      (e.keyCode == 65 && e.ctrlKey === true) ||
      // Allow: Ctrl+C
      (e.keyCode == 67 && e.ctrlKey === true) ||
      // Allow: Ctrl+V
      (e.keyCode == 86 && e.ctrlKey === true) ||
      // Allow: Ctrl+X
      (e.keyCode == 88 && e.ctrlKey === true) ||
      // Allow: home, end, left, right
      (e.keyCode >= 35 && e.keyCode <= 39)) {
      // let it happen, don't do anything
      return;
    }
    let ch = String.fromCharCode(e.keyCode);
    let regEx = new RegExp(this.regexStr);
    if (regEx.test(ch))
      return;
    else
      e.preventDefault();

  }


}
