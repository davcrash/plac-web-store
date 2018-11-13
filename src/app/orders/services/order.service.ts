import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GlobalService } from 'src/app/global.service';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private _globalService: GlobalService) { }

  order: any;

  getOrderByUserId(): Observable<any> {
    let id = JSON.parse(localStorage.getItem('user_data')).plac_user_id;
    return this._globalService.HttpMethod("GET", `tienda/store/orders/user/${id}/state`);

  }

  getOrderById(id): Observable<any> {
    let plac_user_id = JSON.parse(localStorage.getItem('user_data')).plac_user_id;

    return this._globalService.HttpMethod("GET", `orders/${id}`, { plac_user_id });

  }
}
