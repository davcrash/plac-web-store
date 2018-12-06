import { Injectable } from '@angular/core';
import { GlobalService } from '../../global.service';

@Injectable({
  providedIn: 'root'
})
export class PurchaseService {

  constructor(private _globalService: GlobalService) { }


  getUserAddresses(userId) {
    return this._globalService.HttpMethod("GET", "placusers/shippingaddresses/" + userId);
  }

  addNewAddress(address) {
    return this._globalService.HttpMethod("POST", "placusers/shippingaddresses", address);
  }

  checkCoupon(coupon_code, plac_user_id, place_id, total, subTotal, shipping_price) {

    let request = {
      coupon_code,
      plac_user_id,
      place_id,
      total,
      subTotal,
      shipping_price
    }
    return this._globalService.HttpMethod("POST", "coupons/check", request);
  }

  getPaymentMethodsAndCityPrice(request) {
    return this._globalService.HttpMethod("POST", "storeconfiguration/place", request);
  }

  createOrder(order) {
    return this._globalService.HttpMethod("POST", 'orders', order);
  }

  getDepartments() {
    return this._globalService.HttpMethod("GET", "cities/departments");
  }

  getCityByDepartmentId(department_id) {
    return this._globalService.HttpMethod("GET", "cities/departments/" + department_id);
  }


}
