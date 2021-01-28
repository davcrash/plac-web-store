import { Injectable } from "@angular/core";
import { GlobalService } from "../../global.service";
import { Observable } from "rxjs";
import { places, products } from "src/app/data";

@Injectable({
  providedIn: "root",
})
export class SearchService {
  constructor(private _globalService: GlobalService) {}

  getSearchPlacesProducts(
    queryText,
    orderByPrice,
    paymentTypeFilter
  ): Observable<any> {
    return new Observable((subscriber) => {
      const placesWithProducts = [
        {
          ...places[2],
          products: { data: products.slice(0, 2) },
          next_page_url: null,
        },
        {
          ...places[0],
          products: { data: products.slice(2, 15) },
          next_page_url: null,
        },
        {
          ...places[5],
          products: { data: products.slice(4, 9) },
          next_page_url: null,
        },
      ];

      setTimeout(() => subscriber.next(placesWithProducts), 1000);
    });
  }

  getMorePlacesWithProducts(
    url,
    queryText,
    orderByPrice,
    paymentTypeFilter
  ): Observable<any> {
    return new Observable();
  }
}
