import { Injectable } from "@angular/core";
import { GlobalService } from "../../global.service";
import { Observable } from "rxjs";
import { places, products } from "src/app/data";

@Injectable({
  providedIn: "root",
})
export class CategoryWithFiltersService {
  constructor(private _globalService: GlobalService) {}

  getPlacesWithProducts(
    categoryReceivedByRoute,
    subcategorySelected,
    productBrandSelected
  ): Observable<any> {
    return new Observable((r) => {
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

      setTimeout(() => {
        r.next({
          data: {
            data: placesWithProducts,
            next_page_url: null,
          },
        });
      }, 1000);
    });
  }

  getMorePlacesWithProducts(
    next_page_url,
    categoryReceivedByRoute,
    subcategorySelected,
    productBrandSelected
  ): Observable<any> {
    let params = {
      filters: {
        category_name: categoryReceivedByRoute ? categoryReceivedByRoute : null,
        subcategory_name: subcategorySelected ? subcategorySelected : null,
        brand: productBrandSelected ? productBrandSelected : null,
        pet_type:
          localStorage.getItem("pet_filter") != null
            ? localStorage.getItem("pet_filter")
            : "",
      },
    };
    return this._globalService.HttpMethodWithUrl("POST", next_page_url, params);
  }
}
