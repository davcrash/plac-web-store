import { Injectable } from '@angular/core';
import { GlobalService } from '../../global.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryWithFiltersService {

  constructor(private _globalService: GlobalService) { }


  getPlacesWithProducts(categoryReceivedByRoute, subcategorySelected, productBrandSelected): Observable<any> {
    /*var params = {
      'petTypeName': localStorage.getItem("pet_filter"),
      'category': {
        'category_name': categoryReceivedByRoute,
        'subcategory': {
          'subcategory_name': subcategorySelected
        }
      },
      'brand': productBrandSelected
    }
    */
    let params = {
      filters: {
        category_name: categoryReceivedByRoute ? categoryReceivedByRoute : null,
        subcategory_name: subcategorySelected ? subcategorySelected : null,
        brand: productBrandSelected ? productBrandSelected : null,
        pet_type: localStorage.getItem("pet_filter") != null ? localStorage.getItem("pet_filter") : ''
      }
    };
    return this._globalService.HttpMethod("POST", "products/places/filters", params);
  }

  getMorePlacesWithProducts(next_page_url,categoryReceivedByRoute, subcategorySelected, productBrandSelected): Observable<any>{
 
   let params = {
    filters: {
      category_name: categoryReceivedByRoute ? categoryReceivedByRoute : null,
      subcategory_name: subcategorySelected ? subcategorySelected : null,
      brand: productBrandSelected ? productBrandSelected : null,
      pet_type: localStorage.getItem("pet_filter") != null ? localStorage.getItem("pet_filter") : ''
    }
  };
  return this._globalService.HttpMethodWithUrl("POST", next_page_url, params);
  }
}
