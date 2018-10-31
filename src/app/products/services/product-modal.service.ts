import { Injectable } from '@angular/core';
import { GlobalService } from '../../global.service';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ProductModalService {

  constructor(private _globalService: GlobalService) { }

  getProductByName(name): Observable<any> {
    return this._globalService.HttpMethod("GET", "getproductbyid/"+name);
  }

  sendNewQuestion(question): Observable<any>{
    return this._globalService.HttpMethod("POST", "store/product/questions/tienda", question);
  }
}
