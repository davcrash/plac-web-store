import { Injectable } from '@angular/core';
import { LocalStorageService } from '../../local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class ShopCartService {

  shopCartArray = [];

  constructor(
    private _localStorageService: LocalStorageService
  ) { }

  addProductToCart(product, quantity) {

    var shopCart = JSON.parse(localStorage.getItem("shop-cart"));
    var place = product.place_location;

    //Validamos si el objeto en local storage ya existe
    if (shopCart) {

      //Buscamos en el objeto del carro si la empresa ya esta
      var objectPlace = shopCart.find((element, index) => {
        if(index != 0){
          return element.place.place_id == product.place_id;
        }
      });
      //Validamos si el objeto de la empresa ya existe, si no lo creamos
      if (!objectPlace) {
        var newObjectPlace = {
          place: place,
          order_detail: [],
          showPlace: true
          // total: product.product_price * quantity
        }
        shopCart.push(newObjectPlace);
        objectPlace = newObjectPlace;
      }


      //Miramos si en el carro ya esta el producto
      //si el producto ya esta y si esta sumamos uno a la cantidad y modificamos los totales
      var objectProduct = objectPlace.order_detail.find(element => {
        if (element.product.product_id == product.product_id) {
          element.quantity = parseInt(quantity);
        }
        return element.product.product_id == product.product_id;
      });


      //delete product.place_location;
      //delete product.questions;

      //Si el producto no esta lo agregamos
      if (!objectProduct) {
        var newProductObject = {
          product: product,
          quantity: quantity,
          showProduct: true
        }
        //objectPlace.total = this.calculateTotalPlace(product, quantity);
        objectPlace.order_detail.push(newProductObject);
      }

      this._localStorageService.removeItem("shop-cart");
      this._localStorageService.setItem("shop-cart", JSON.stringify(shopCart));
      this.calculateTotalPlace(product);
      this.calculateTotalGeneral();

    } else {

      //delete product.place_location;
      //delete product.questions;
      //Le damos la estructura al objeto y lo creamos en el localstorage
      var newProduct: any = [];

      newProduct[0] = {
        totalOrder: 0
      };

      newProduct[1] = {
        place: place,
        order_detail: [],
        showPlace: true
        //# total: product.product_price * parseInt(quantity)
      };

      newProduct[1].order_detail[0] = {
        product: product,
        quantity: quantity,
        showProduct: true
      }

      this._localStorageService.setItem("shop-cart", JSON.stringify(newProduct));
      this.calculateTotalPlace(product);
      this.calculateTotalGeneral();

    }

  }

  calculateTotalGeneral() {
    var shopCart = JSON.parse(localStorage.getItem("shop-cart"));
    var total = 0;

    shopCart.forEach((element, index) => {
      if (index != 0) {
        total = total + parseFloat(element.total);
      }
    });

    shopCart[0].totalOrder = total;
    this._localStorageService.setItem("shop-cart", JSON.stringify(shopCart));

  }

  calculateTotalPlace(product) {

    var shopCart = JSON.parse(localStorage.getItem("shop-cart"));

    var placeObject = shopCart.find((element, index) => {
      if (index != 0) {
        return element.place.place_id == product.place_id;
      }
    })

    var totalPlace = 0;
    placeObject.order_detail.forEach(element => {
      element.totalProduct = element.product.product_price * element.quantity;
      if(element.quantity == 0){
        element.showProduct = false;
      }else{
        element.showProduct = true;
      }
      totalPlace += element.totalProduct;
    });

    placeObject.total = totalPlace;
    if(totalPlace == 0){
      placeObject.showPlace = false;
    }else{
      placeObject.showPlace = true;
    }

    this._localStorageService.setItem("shop-cart", JSON.stringify(shopCart));

  }

  getProductInCart(product) {
    var shopCart = JSON.parse(localStorage.getItem("shop-cart"));
    var productObject = {
      quantity: 1
    };

    if (shopCart) {
      shopCart.find((place, index) => {
        if (index != 0) {
          return productObject = place.order_detail.find(productFind => {
            return product.product_id == productFind.product.product_id;
          });
        }
      });
    }

    if (!productObject) {
      productObject = {
        quantity: 1
      };
    }

    return productObject;
  }

  validateQuantities(){
    if(JSON.parse(localStorage.getItem('shop-cart'))[0].totalOrder == 0){
      return true;
    }else{
      return false;
    }
  }

}
