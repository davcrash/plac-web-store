import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { LocalStorageService } from '../../local-storage.service';
import { ShopCartService } from '../services/shop-cart.service';
import { Router } from '@angular/router';
import swal from 'sweetalert';


@Component({
  selector: 'app-shop-cart-view',
  templateUrl: './shop-cart-view.component.html',
  styleUrls: ['./shop-cart-view.component.css']
})
export class ShopCartViewComponent implements OnInit {

  shopCart: any;
  cartEmpty = true;
  @Output() public closeCar = new EventEmitter<void>();

  constructor(
    private _localStorageService: LocalStorageService,
    private _shopService: ShopCartService,
    private _router: Router
  ) {
  }

  ngOnInit() {

    this.shopCart = JSON.parse(localStorage.getItem('shop-cart'));

    // this.cartEmpty = this._shopService.validateQuantities();
    if (this.shopCart.length > 0) {
      this.cartEmpty = false;
    }

    this._localStorageService.watchStorage().subscribe((data) => {
      if (data.change === 'shop-cart') {
        this.shopCart = JSON.parse(localStorage.getItem('shop-cart'));
        if (this.shopCart.length > 0) {
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

    if (quantity <= 0) { //Estan eliminando un producto
      this.shopCart[indexPlace].order_detail[indexProduct] = null;
      if (this._shopService.calculateTotalPlace(this.shopCart[indexPlace]) <= 0) {
        this.shopCart[indexPlace] = null;

      }
    }

    this._shopService.addProductToCart(product, quantity);
    this.validateEmptyCar();
    // this.cartEmpty = this._shopService.validateQuantities();

  }


  validateEmptyCar() {
    this.cartEmpty = true;
    this.shopCart.forEach(element => {
      if (element != null) {
        this.cartEmpty = false;
      }
    });
  }

  goToBuy(iPlace) {

    if (localStorage.getItem("user_data")) {
      this._router.navigate(['/compra/' + iPlace]);
      this.closeCar.emit();
    } else {
      this.closeCar.emit();


      swal({
        title: 'Inicia sesión',
        text: 'Para realizar tus compras, primero debes iniciar sesión',
        icon: 'info',
        buttons: ["Más tarde", "Iniciar sesión"]
      }).then((value) => {
        if (value === true) {
          this._router.navigate(['login']);
        }
      });

      /*
      setTimeout(() => {

        swal({
          title: 'Inicia sesión',
          text: 'Para realizar tus compras, primero debes iniciar sesión',
          type: 'info',
          showCancelButton: true,
          cancelButtonText: 'Más tarde',
          confirmButtonText: 'Iniciar sesión'
        }).then(res => {
          if (res.value === true) {
            this._router.navigate(['login']);
          }
        });

      }, 10000);
*/
    }


  }






}
