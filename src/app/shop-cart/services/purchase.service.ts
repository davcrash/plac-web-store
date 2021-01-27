import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { GlobalService } from "../../global.service";

@Injectable({
  providedIn: "root",
})
export class PurchaseService {
  constructor(private _globalService: GlobalService) {}

  getUserAddresses(userId) {
    return this._globalService.HttpMethod(
      "GET",
      "placusers/shippingaddresses/" + userId
    );
  }

  addNewAddress(address) {
    return this._globalService.HttpMethod(
      "POST",
      "placusers/shippingaddresses",
      address
    );
  }

  editAddress(id, address) {
    address._method = "PUT";
    return this._globalService.HttpMethod(
      "POST",
      `placusers/shippingaddresses/${id}`,
      address
    );
  }

  deleteAddress(id) {
    let params = { _method: "DELETE" };
    return this._globalService.HttpMethod(
      "POST",
      `placusers/shippingaddresses/${id}`,
      params
    );
  }

  checkCoupon(
    coupon_code,
    plac_user_id,
    place_id,
    total,
    subTotal,
    shipping_price
  ) {
    let request = {
      coupon_code,
      plac_user_id,
      place_id,
      total,
      subTotal,
      shipping_price,
    };
    return this._globalService.HttpMethod("POST", "coupons/check", request);
  }

  getPaymentMethodsAndCityPrice(request) {
    return this._globalService.HttpMethod(
      "POST",
      "storeconfiguration/place",
      request
    );
  }

  createOrder(order) {
    return this._globalService.HttpMethod("POST", "orders", order);
  }

  getCountries() {
    return new Observable<any>((r) => {
      r.next({
        data: [
          {
            country_id: "bta",
            country_name: "Bogotá",
          },
          {
            country_id: "mdll",
            country_name: "Medellin",
          },
          {
            country_id: "cali",
            country_name: "Cali",
          },
        ],
      });
    });
  }

  getDepartments() {
    return new Observable<any>((r) => {
      r.next({
        data: [
          {
            id_departamento: 1,
            departamento: "Bogota",
          },
        ],
      });
    });
  }

  getCityByFilter(country_id, department_id?) {
    let filter = {
      country_id,
    };
    department_id ? (filter["department_id"] = department_id) : "";

    return this._globalService.HttpMethod(
      "GET",
      "cities/departments/filter",
      filter
    );
  }
}
