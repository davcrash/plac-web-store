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

  editAddress(id, address) {
    address._method = 'PUT';
    return this._globalService.HttpMethod("POST", `placusers/shippingaddresses/${id}`, address);
  }

  deleteAddress(id) {
    let params = {_method:'DELETE'};
    return this._globalService.HttpMethod("POST", `placusers/shippingaddresses/${id}`, params);
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

  getCountries() {
    return this._globalService.HttpMethod("GET", "cities/countries");
  }

  getDepartments() {
    return this._globalService.HttpMethod("GET", "cities/departments");
  }

  getCityByFilter(country_id, department_id?) {

    let filter = {
      country_id
    };
    department_id ? filter['department_id'] = department_id : '';

    return this._globalService.HttpMethod("GET", "cities/departments/filter", filter);
  }


}
