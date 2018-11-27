import { Injectable } from '@angular/core';
import { GlobalService } from '../../global.service';

@Injectable({
  providedIn: 'root'
})
export class PurchaseService {

  constructor(private _globalService: GlobalService) { }


  getuserAddresses(userId) {
    return this._globalService.HttpMethod("GET", "placuser/shipping/address/" + userId);
  }

  addNewAddress(address) {
    return this._globalService.HttpMethod("POST", "placuser/shipping/address", address);
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

  getPaymentMethods(placeId) {
    return this._globalService.HttpMethod("POST", "store/place/payments/availables/tienda", placeId);
  }

  getPaymentMethodsAndCityPrice(request) {
    return this._globalService.HttpMethod("POST", "storeconfiguration/place", request);
  }

  createOrder(order) {
    return this._globalService.HttpMethodAccesKey('orders', order);
  }

  createOrderV2(order) {
    return this._globalService.HttpMethodWithUrl('POST', 'https://api.placapp.com/v2/orders', order);
  }


  getDepartments() {
    return this._globalService.HttpMethod("GET", "store/purchase/get/departments");
  }

  getCityByDepartmentId(department_id) {
    return this._globalService.HttpMethod("GET", "store/purchase/get/cities/" + department_id);
  }


}
