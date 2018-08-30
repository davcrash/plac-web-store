import { Injectable } from '@angular/core';
import { GlobalService } from '../../global.service';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ProductModalService {

  constructor(private _globalService: GlobalService) { }

  getProductById(id): Observable<any> {
    return this._globalService.HttpMethod("GET", "getproductbyid/"+id);
  }
}
