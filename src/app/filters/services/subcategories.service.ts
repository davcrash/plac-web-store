import { Injectable } from '@angular/core';
import { GlobalService } from '../../global.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SubcategoriesService {

  constructor(
    private _globalService: GlobalService
  ) { }

  getSubCategories(category_name, pet_target): Observable<any> {
    var params = {
      filters: {
        pet_type: pet_target != null ? pet_target : '',
        category_name
      }
    };

    return this._globalService.HttpMethod("POST", "products/categories/subcategories/filter", params);
  }


}
