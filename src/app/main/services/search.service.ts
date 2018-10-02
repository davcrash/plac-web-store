import { Injectable } from '@angular/core';
import { GlobalService } from '../../global.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor(private _globalService: GlobalService) { }


  getSearchPlacesProducts(queryText, orderByPrice, paymentTypeFilter): Observable<any> {
    var params = {
      filters: {
        city_id: localStorage.getItem("city"),
        payment_type: paymentTypeFilter,
        pet_type: localStorage.getItem("pet_filter") != null ? localStorage.getItem("pet_filter") : ''
      },
      orderBy: orderByPrice,//price_low o price_high
      search: queryText
    }
    return this._globalService.HttpMethod("POST", "store/search/tienda", params);
  }

  getMorePlacesWithProducts(url, queryText, orderByPrice, paymentTypeFilter): Observable<any> {
    var params = {
      filters: {
        city_id: localStorage.getItem("city"),
        payment_type: paymentTypeFilter,
        pet_type: localStorage.getItem("pet_filter") != null ? localStorage.getItem("pet_filter") : ''
      },
      orderBy: orderByPrice,//price_low o price_high
      search: queryText
    }
    return this._globalService.HttpMethodWithUrl("POST", url, params);
  }


}
