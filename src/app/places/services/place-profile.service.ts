import { Injectable } from "@angular/core";
import { GlobalService } from "../../global.service";
import { Observable } from "rxjs";
import { FormatService } from "src/app/format.service";
import { places, products } from "src/app/data";

@Injectable({
  providedIn: "root",
})
export class PlaceProfileService {
  place: any;
  category: string;
  subcategoryId: string;
  subcategoryName: string;
  brand: string;

  constructor(
    private _globalService: GlobalService,
    private _formatService: FormatService
  ) {}

  getPlaceByName(name): Observable<any> {
    const unformatedName = this._formatService
      .unformatString(name)
      .toLowerCase();

    const place = places.find(
      (place) =>
        place.place_location.place_location_name.toLowerCase() == unformatedName
    );
    return new Observable((s) => {
      s.next(place);
    });
  }

  getProducts(search?): Observable<any> {
    return new Observable((s) => {
      setTimeout(() => {
        s.next({
          data: {
            next_page_url: null,
            data: products,
          },
        });
      }, 500);
    });
  }

  getMoreProducts(url, search?): Observable<any> {
    return new Observable((s) => {
      s.next({
        next_page_url: null,
        data: products,
      });
    });
  }

  getRatingBrief(place_id): Observable<any> {
    return new Observable((s) =>
      s.next({
        data: {
          ratingAverage: 4.0,
          ratingTotal: 100,
          ratingBars: [
            { start: 1, qty: 15 },
            { start: 2, qty: 20 },
            { start: 3, qty: 5 },
            { start: 4, qty: 10 },
            { start: 5, qty: 70 },
          ],
          ratingBarsType: [{ qty: 3 }],
        },
      })
    );
  }

  getRatingReviews(place_id): Observable<any> {
    return new Observable((s) => {
      s.next({
        data: {
          next_page_url: null,
          data: [
            {
              plac_user_name: "Javi",
              assessment_quantity: 5,
              assessment_message: "Muy Bueno",
              created_ago: "hace un mes",
            },
            {
              plac_user_name: "Bad Bunny",
              assessment_quantity: 3,
              assessment_message:
                "Muy Bueno me gusto mucho como estaba, brrr real hasta la muelte",
              created_ago: "hace un mes",
            },
            {
              plac_user_name: "El señor bravo",
              assessment_quantity: 1,
              assessment_message: "Muy Malo",
              created_ago: "hace un mes",
            },
            {
              plac_user_name: "Juan Manuel",
              assessment_quantity: 5,
              assessment_message: "Muy Bueno",
              created_ago: "hace un mes",
            },
          ],
        },
      });
    });
  }

  getMoreRatingReviews(url, place_id): Observable<any> {
    let params = {
      place_id,
    };
    return this._globalService.HttpMethodWithUrl("POST", url, params);
  }
}
