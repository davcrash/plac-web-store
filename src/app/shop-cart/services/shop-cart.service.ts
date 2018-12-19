import { Injectable } from '@angular/core';
import { LocalStorageService } from '../../local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class ShopCartService {

  myShopCart = [];

  constructor(
    private _localStorageService: LocalStorageService
  ) {

    //Miramnos si el shopCart existe en localStorage, si no lo creamos
    if (!localStorage.getItem("shop-cart")) {
      var newShopCart = [];
      localStorage.setItem("shop-cart", JSON.stringify(newShopCart));
    }

    //Obtenemos el carro de compras
    this.myShopCart = JSON.parse(localStorage.getItem("shop-cart"));

  }

  addProductToCart(product, quantity, eventType?) {


    var place = product.place_location;

    //Buscamos en el objeto del carro si la empresa ya esta
    var indexPlace = 0;
    var placeObject = this.myShopCart.find((element, index) => {
      indexPlace = index;
      return element.place.place_id == product.place_id;
    });

    //Si el objeto de la empresa no existe lo creamos
    if (!placeObject) {
      placeObject = this.createPlaceObject(place);
    }

    //Miramos si en el carro ya esta el producto
    //si el producto ya esta modificamos la cantidad y modificamos los totales
    var indexProduct = 0;
    var productObject = placeObject.order_detail.find((element, index) => {
      if (element.product.product_id == product.product_id) {
        element.quantity = parseInt(quantity);
      }
      indexProduct = index;
      return element.product.product_id == product.product_id;
    });

    //Si el producto no esta lo agregamos
    if (!productObject) {
      this.createProductObject(placeObject, product, quantity);
    }

    this.calculateTotalPlace(placeObject);


    //si la cantidad es 0 quiere decir que eliminaron el producto desde el carrito
    if (quantity <= 0) {
      this.removeProduct(indexPlace, indexProduct);
    }

    //Si viene del dialogo del producto, utilizamos el metodo para que escuche y se abra el carrito
    if (eventType == true) {//si es true es porque viene del modal
      sessionStorage.setItem("flag-in-open", JSON.stringify({ place_index: indexPlace, product_id: product.product_id }));
      this._localStorageService.setItem("shop-cart", JSON.stringify(this.myShopCart));
    } else if (eventType == 'purchase') {//viene del purchase view

      sessionStorage.setItem("flag-in-purchase", 'true');
      this._localStorageService.setItem("shop-cart", JSON.stringify(this.myShopCart));

    } else {
      localStorage.setItem("shop-cart", JSON.stringify(this.myShopCart));
    }

  }

  createPlaceObject(place) {

    var placeObject = {
      place: place,
      order_detail: [],
      total: 0
    }

    this.myShopCart.push(placeObject);

    return placeObject;
  }

  createProductObject(placeObject, product, quantity) {

    delete product.place_location;
    delete product.questions;

    placeObject.order_detail.push({
      product: product,
      quantity: quantity,
    });

  }


  calculateTotalPlace(placeObject) {

    var totalPlace = 0;
    placeObject.order_detail.forEach(element => {
      if (element) {
        element.totalProduct = element.product.product_price * element.quantity;
        totalPlace += element.totalProduct;
      }
    });

    placeObject.total = totalPlace;

    return totalPlace;

  }

  getCountProducts() {
    let count = 0;
    this.myShopCart.forEach(place => {
      place.order_detail.forEach(product => {
        count += product.quantity;
      });
    });

    return count;
  }

  getProductCount(product_id) {
    let count = 0;

    this.myShopCart.forEach(place => {

      let product = place.order_detail.find(product => {
        return product.product.product_id === product_id;
      });

      if (product) {
        count += product.quantity;
      }
    });
    return count;
  }

  getProductInCart(product) {
    var productObject = {
      quantity: 1
    };

    this.myShopCart.find((place) => {
      return productObject = place.order_detail.find(productFind => {
        return product.product_id == productFind.product.product_id;
      });
    });

    if (!productObject) {
      productObject = {
        quantity: 1
      };
    }

    return productObject;
  }


  removeProduct(indexPlace, indexProduct) {

    delete this.myShopCart[indexPlace].order_detail[indexProduct];

    if (this.myShopCart[indexPlace].total <= 0) {
      delete this.myShopCart[indexPlace]
    }

    this.reIndexingShopCart();

  }

  removePlace(indexPlace) {
    delete this.myShopCart[indexPlace];
    this.reIndexingShopCart();
    //localStorage.setItem("flag-in-purchase", "1");
    this._localStorageService.setItem("shop-cart", JSON.stringify(this.myShopCart));
  }

  reIndexingShopCart() {

    var shopCartAux = [];

    this.myShopCart.forEach(placeObject => {

      if (placeObject) {

        var placePush = {
          place: placeObject.place,
          order_detail: [],
          total: placeObject.total
        }

        placeObject.order_detail.forEach(product => {
          if (product) {
            placePush.order_detail.push(product);
          }
        });

        shopCartAux.push(placePush);
      }

    });
    this.myShopCart = shopCartAux;
  }

}
