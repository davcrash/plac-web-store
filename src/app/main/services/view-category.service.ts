import { Injectable } from '@angular/core';
import { GlobalService } from '../../global.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ViewCategoryService {

  constructor(private _globalService: GlobalService) { }

  
  getPlacesWithProducts(categoryReceivedByRoute, subcategorySelected): Observable<any> {
    var params = {
      'cityId': localStorage.getItem("city"),
      'petTypeName': localStorage.getItem("pet_filter"),
      'category': {
        'category_name': categoryReceivedByRoute,
        'subcategory': {
          'subcategory_name': subcategorySelected
        }
      }
    }
    return this._globalService.HttpMethod("POST", "/store/places/city", params);
  }
}
