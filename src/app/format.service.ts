import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FormatService {

  constructor() { }


  formatString(string: string) {
    string = string.replace(/-/g, " ");
    string = string.replace(/\//g, " ");
    string = string.toLowerCase().trim();
    string = string.replace(/\s+/g, " ");
    string = string.normalize('NFD').replace(/[\u0300-\u036f]/g, "");
    string = string.replace(/ /g, '-');
    string = string.replace(/[^A-Za-z0-9&-]/g, "");
    return string;
  }

  unformatString(string: string) {
    string = string.trim();
    string = string[0].toUpperCase() + string.slice(1);
    string = string.replace(/-/g, ' ');
    return string;
  }
}
