import { Injectable } from "@angular/core";
import { GlobalService } from "../../global.service";
import { Observable } from "rxjs";
import { tap } from "rxjs/operators";
import { LocalStorageService } from "../../local-storage.service";
import { categories } from "src/app/data";

@Injectable({
  providedIn: "root",
})
export class SidemenuService {
  constructor(
    private _globalService: GlobalService,
    private _localStorageService: LocalStorageService
  ) {}

  getCategories(): Observable<any> {
    return new Observable((subscriber) => {
      this._localStorageService.setItem(
        "categories",
        JSON.stringify(categories)
      );
      subscriber.next(categories);
    });
  }
}
