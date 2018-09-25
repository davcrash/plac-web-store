import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { LocalStorageService } from '../../local-storage.service';
import { ShopCartService } from '../services/shop-cart.service';

@Component({
  selector: 'app-shop-cart-view',
  templateUrl: './shop-cart-view.component.html',
  styleUrls: ['./shop-cart-view.component.css']
})
export class ShopCartViewComponent implements OnInit {

  shopCart: any;
  cartEmpty = true;
  @Output() public closeCar = new EventEmitter<void>();

  constructor(private _localStorageService: LocalStorageService,
    private _shopService: ShopCartService) {
  }

  ngOnInit() {

    this.shopCart = JSON.parse(localStorage.getItem('shop-cart'));

    // this.cartEmpty = this._shopService.validateQuantities();
    if(this.shopCart.length > 0){
      this.cartEmpty = false;
    }

    this._localStorageService.watchStorage().subscribe((data) => {
      if (data.change === 'shop-cart') {
          this.shopCart = JSON.parse(localStorage.getItem('shop-cart'));
          if(this.shopCart.length > 0){
            this.cartEmpty = false;
          }
      }
    });

  }


  addUnit(indexPlace, indexProduct) {

      var quantity = this.shopCart[indexPlace].order_detail[indexProduct].quantity += 1;
      var product = this.shopCart[indexPlace].order_detail[indexProduct].product;

      this.shopCart[indexPlace].total = this._shopService.calculateTotalPlace(this.shopCart[indexPlace]);
      this.shopCart[indexPlace].order_detail[indexProduct].totalProduct = quantity * parseFloat(product.product_price);
 
      this._shopService.addProductToCart(product, quantity);
  }

  decreaseUnit(indexPlace, indexProduct) {

    var quantity = this.shopCart[indexPlace].order_detail[indexProduct].quantity -= 1;
    var product = this.shopCart[indexPlace].order_detail[indexProduct].product;

    this.shopCart[indexPlace].total = this._shopService.calculateTotalPlace(this.shopCart[indexPlace]);
    this.shopCart[indexPlace].order_detail[indexProduct].totalProduct = quantity * parseFloat(product.product_price);

    if(quantity <= 0){ //Estan eliminando un producto
      this.shopCart[indexPlace].order_detail[indexProduct] = null;
      if(this._shopService.calculateTotalPlace(this.shopCart[indexPlace]) <= 0){
        this.shopCart[indexPlace] = null;
        
      }
    }

    this._shopService.addProductToCart(product, quantity);
    this.validateEmptyCar();
    // this.cartEmpty = this._shopService.validateQuantities();
  
  }

  
  validateEmptyCar(){
    this.cartEmpty = true;
    this.shopCart.forEach(element => {
      if(element != null){
        this.cartEmpty = false;
      }
    });
  }





}
