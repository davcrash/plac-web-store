import { Injectable } from '@angular/core';
import { GlobalService } from '../../global.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(private _globalService: GlobalService) { }

  getFeaturedProducts(): Observable<any> {
    var params = {
      'pet_target': localStorage.getItem("pet_filter")!=null?localStorage.getItem("pet_filter"):''
    }
    return this._globalService.HttpMethod("GET", "featured/products", params);
  }

  getFeaturedPlaces(): Observable<any> {

    var params = {
      'pet_target':localStorage.getItem("pet_filter")!=null?localStorage.getItem("pet_filter"):''
    }
    return this._globalService.HttpMethod("GET", "featured/places", params);
  }


}
