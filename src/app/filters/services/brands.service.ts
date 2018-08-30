import { Injectable } from '@angular/core';
import { GlobalService } from '../../global.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BrandsService {

  constructor(private _globalService: GlobalService) { }

  getBrands(category_id, pet_target, subcategory_id): Observable<any> {

    var params = {
      filters: {
        'category_id': category_id,
        'pet_type': pet_target != null ? pet_target : '',
      }
    };

    subcategory_id!=""?params.filters['subcategory_id']=subcategory_id:'';

    return this._globalService.HttpMethod("POST", "store/place/products/brand", params);
  }
}
