import { Injectable } from "@angular/core";
import { GlobalService } from "../../global.service";
import { Observable } from "rxjs";
import { places, products } from "src/app/data";

@Injectable({
  providedIn: "root",
})
export class HomeService {
  constructor(private _globalService: GlobalService) {}

  getFeaturedProducts(): Observable<any> {
    return new Observable((subscriber) => {
      subscriber.next(products);
    });
  }

  getFeaturedPlaces(): Observable<any> {
    return new Observable((subscriber) => {
      subscriber.next(places);
    });
  }
}
