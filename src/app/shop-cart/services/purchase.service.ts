import { Injectable } from '@angular/core';
import { GlobalService } from '../../global.service';

@Injectable({
  providedIn: 'root'
})
export class PurchaseService {

  constructor(private _globalService: GlobalService) { }


  getuserAddresses(userId){
    return this._globalService.HttpMethod("GET", "placuser/shipping/address/"+userId);
  }

  addNewAddress(address){
    return this._globalService.HttpMethod("POST", "placuser/shipping/address/", address);
  }

  getPaymentMethods(placeId){
    return this._globalService.HttpMethod("POST", "store/place/payments/availables/tienda", placeId);
  }

  createOrder(order){
    return this._globalService.HttpMethodAccesKey('orders', order);
  }
  

}
