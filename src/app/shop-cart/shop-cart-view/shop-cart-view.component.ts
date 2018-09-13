import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from '../../local-storage.service';
import { ShopCartService } from '../services/shop-cart.service';

@Component({
  selector: 'app-shop-cart-view',
  templateUrl: './shop-cart-view.component.html',
  styleUrls: ['./shop-cart-view.component.css']
})
export class ShopCartViewComponent implements OnInit {

  shopCart: any;
  
  cartEmpty = false;



  constructor(private _localStorageService: LocalStorageService,
    private _shopService: ShopCartService) { 
    }



  ngOnInit() {

    if (localStorage.getItem('shop-cart')) {
      this.shopCart = JSON.parse(localStorage.getItem('shop-cart'));
      this.cartEmpty = this._shopService.validateQuantities();
    }


    this._localStorageService.watchStorage().subscribe((data) => {
      if (data.change === 'shop-cart') {
        if (localStorage.getItem('flag') != "inShopCart") {
          this.shopCart = JSON.parse(localStorage.getItem('shop-cart'));
          this.cartEmpty = this._shopService.validateQuantities();
        }

      }
    });

  }


  addUnit(indexPlace, indexProduct) {

    

    if (this.shopCart[indexPlace].order_detail[indexProduct].quantity < 50) {
      var quantity = this.shopCart[indexPlace].order_detail[indexProduct].quantity += 1;
      var product = this.shopCart[indexPlace].order_detail[indexProduct].product;
      localStorage.setItem("flag", "inShopCart");
      this._shopService.addProductToCart(product, quantity);

      this.shopCart[indexPlace].total = JSON.parse(localStorage.getItem('shop-cart'))[indexPlace].total;
      this.shopCart[indexPlace].order_detail[indexProduct].totalProduct = JSON.parse(localStorage.getItem('shop-cart'))[indexPlace].order_detail[indexProduct].totalProduct;
      localStorage.removeItem("flag");
    }




  }

  decreaseUnit(indexPlace, indexProduct) {

    var quantity = this.shopCart[indexPlace].order_detail[indexProduct].quantity -= 1;
    var product = this.shopCart[indexPlace].order_detail[indexProduct].product;
    localStorage.setItem("flag", "inShopCart");
    this._shopService.addProductToCart(product, quantity);

    this.shopCart[indexPlace].total = JSON.parse(localStorage.getItem('shop-cart'))[indexPlace].total;
    this.shopCart[indexPlace].order_detail[indexProduct].totalProduct = JSON.parse(localStorage.getItem('shop-cart'))[indexPlace].order_detail[indexProduct].totalProduct;

    this.shopCart[indexPlace].showPlace = JSON.parse(localStorage.getItem('shop-cart'))[indexPlace].showPlace;
    this.shopCart[indexPlace].order_detail[indexProduct].showProduct = JSON.parse(localStorage.getItem('shop-cart'))[indexPlace].order_detail[indexProduct].showProduct;
    this.cartEmpty = this._shopService.validateQuantities();
    localStorage.removeItem("flag");
  }


  


}
