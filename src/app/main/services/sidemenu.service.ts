import { Injectable } from '@angular/core';
import { GlobalService } from '../../global.service';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { LocalStorageService } from '../../local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class SidemenuService {

  constructor(
    private _globalService: GlobalService,
    private _localStorageService: LocalStorageService,
  ) { }

  getCategories(): Observable<any> {
    return this._globalService.HttpMethod("GET", "categories/subcategories")
      .pipe(tap(res => {
        this._localStorageService.setItem('categories', JSON.stringify(res));
      }));
  }
}
