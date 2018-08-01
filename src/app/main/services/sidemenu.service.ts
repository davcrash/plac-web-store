import { Injectable } from '@angular/core';
import { GlobalService } from '../../global.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SidemenuService {

  constructor(
    private _globalService: GlobalService
  ) { }

  getCategories(): Observable<any> {
    return this._globalService.HttpMethod("GET", "categories/subcategories");
  }
}
