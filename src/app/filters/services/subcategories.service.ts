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
      category_name, 
      pet_target: pet_target!=null?pet_target:''
    };

    return this._globalService.HttpMethod("GET", "subcategories/get", params);
  }


}
