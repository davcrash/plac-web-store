import { Injectable } from '@angular/core';
import { GlobalService } from 'src/app/global.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PressService {

  constructor(private _globalService: GlobalService) { }

  getInfo(): Observable<any> {
    return this._globalService.HttpMethodWithUrl("GET", 'https://api.placapp.com/v2/getinfopress');
  }
}
