import { Injectable } from '@angular/core';
import { GlobalService } from '../../global.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor(private _globalService: GlobalService) { }


  getSearchPlacesProducts(queryText, orderByPrice, paymentTypeFilter): Observable<any> {
    let params = {
      filters: {
        payment_type: paymentTypeFilter,
        pet_type: localStorage.getItem("pet_filter") != null ? localStorage.getItem("pet_filter") : ''
      },
      orderBy: { price: orderByPrice },//low o high
      search: queryText
    }
    return this._globalService.HttpMethod("POST", "products/places/filters", params);
  }

  getMorePlacesWithProducts(url, queryText, orderByPrice, paymentTypeFilter): Observable<any> {
    let params = {
      filters: {
        payment_type: paymentTypeFilter,
        pet_type: localStorage.getItem("pet_filter") != null ? localStorage.getItem("pet_filter") : ''
      },
      orderBy: orderByPrice,//low o high
      search: queryText
    }
    return this._globalService.HttpMethodWithUrl("POST", url, params);
  }


}
