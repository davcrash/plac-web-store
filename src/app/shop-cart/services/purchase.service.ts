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
    return this._globalService.HttpMethod("POST", "placuser/shipping/address", address);
  }

  getPaymentMethods(placeId){
    return this._globalService.HttpMethod("POST", "store/place/payments/availables/tienda", placeId);
  }
  
  getPaymentMethodsAndCityPrice(request){
    return this._globalService.HttpMethod("POST", "storeconfiguration/place", request);
  }
  
  createOrder(order){
    return this._globalService.HttpMethodAccesKey('orders', order);
  }
  
  
  getDepartments(){
    return this._globalService.HttpMethod("GET", "store/purchase/get/departments");
  }

  getCityByDepartmentId(department_id){
    return this._globalService.HttpMethod("GET", "store/purchase/get/cities/"+department_id);
  }
  

}
