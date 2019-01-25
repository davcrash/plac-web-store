import { Injectable } from '@angular/core';
import { GlobalService } from '../../global.service';
import { Observable } from 'rxjs';
import { FormatService } from 'src/app/format.service';

@Injectable({
  providedIn: 'root'
})
export class PlaceProfileService {


  place: any;
  category: string;
  subcategoryId: string;
  subcategoryName: string;
  brand: string;

  constructor(private _globalService: GlobalService, private _formatService: FormatService) { }

  getPlaceByName(name): Observable<any> {
    name = this._formatService.unformatString(name);
    let params = {
      place_name: name
    };
    return this._globalService.HttpMethod("POST", 'places/show/name', params);
  }

  getProducts(search?): Observable<any> {
    let params = {
      filters: {
        pet_type: localStorage.getItem("pet_filter"),
        category_name: (this.category) ? this.category : null,
        subcategory_name: (this.subcategoryName) ? this.subcategoryName : null,
        brand: (this.brand) ? this.brand : null,
        place_id: this.place.place_id,
        pagination: 20,
      },
      search: (search) ? search : null,
    };

    return this._globalService.HttpMethod("POST", 'products/filters', params);
  }

  getMoreProducts(url, search?): Observable<any> {
    let params = {
      filters: {
        pet_type: localStorage.getItem("pet_filter"),
        category_name: (this.category) ? this.category : null,
        subcategory_name: (this.subcategoryName) ? this.subcategoryName : null,
        brand: (this.brand) ? this.brand : null,
        place_id: this.place.place_id,
        pagination: 20,
      },
      search: (search) ? search : null,
    };

    return this._globalService.HttpMethodWithUrl("POST", url, params);
  }

  getRatingBrief(place_id): Observable<any> {
    let params = {
      place_id
    };
    return this._globalService.HttpMethod("POST", 'places/rating/brief', params);
  }

  getRatingReviews(place_id): Observable<any> {
    let params = {
      place_id
    };
    return this._globalService.HttpMethod("POST", 'places/rating/reviews', params);
  }

  getMoreRatingReviews(url, place_id): Observable<any> {
    let params = {
      place_id
    };
    return this._globalService.HttpMethodWithUrl("POST", url, params);
  }


}
