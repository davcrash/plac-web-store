import { Injectable } from '@angular/core';
import { GlobalService } from '../../global.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PlaceProfileService {


  place: any;
  category: string;
  subcategoryId: string;
  subcategoryName: string;
  brand: string;

  constructor(private _globalService: GlobalService) { }

  getPlaceById(id): Observable<any> {
    let params = {
      place_id: id,
      pet_target: localStorage.getItem("pet_filter")
    };

    return this._globalService.HttpMethod("POST", 'store/place/id', params);
  }

  getProducts(): Observable<any> {
    let params = {
      filters: {
        'pet_type': localStorage.getItem("pet_filter"),
        'category': {
          'category_name': (this.category) ? this.category : null,
          'subcategory': {
            'subcategory_name': (this.subcategoryName) ? this.subcategoryName : null
          }
        },
        'brand': (this.brand) ? this.brand : null,
        'place_id': this.place.place_id,
        'limit': 20,
        'search': "",
      }
    };
    return this._globalService.HttpMethod("POST", 'store/place/products', params);
  }

  getMoreProducts(url): Observable<any> {

    let params = {
      filters: {

        'pet_type': localStorage.getItem("pet_filter"),
        'category': {
          'category_name': (this.category) ? this.category : null,
          'subcategory': {
            'subcategory_name': (this.subcategoryName) ? this.subcategoryName : null
          }
        },
        'brand': (this.brand) ? this.brand : null,
        'place_id': this.place.place_id,
        'limit': 20,
        'search': "",
      }
    };

    return this._globalService.HttpMethodWithUrl("POST", url, params);
  }


}
