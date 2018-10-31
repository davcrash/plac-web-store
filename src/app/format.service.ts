import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FormatService {

  constructor() { }


  formatString(string: string) {
    string = string.toLowerCase().trim();
    string = string.replace(/ /g, '-');
    return string;
  }

  unformatString(string: string) {
    string = string.trim();
    string = string[0].toUpperCase() + string.slice(1);
    string = string.replace(/-/g, ' ');
    return string;
  }
}
