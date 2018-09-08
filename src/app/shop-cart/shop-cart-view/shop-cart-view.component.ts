import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from '../../local-storage.service';

@Component({
  selector: 'app-shop-cart-view',
  templateUrl: './shop-cart-view.component.html',
  styleUrls: ['./shop-cart-view.component.css']
})
export class ShopCartViewComponent implements OnInit {

  shopCart:any;

  constructor(private _localStorageService: LocalStorageService) { }

  ngOnInit() {

    if(localStorage.getItem('shop-cart')){
      this.shopCart = JSON.parse(localStorage.getItem('shop-cart'));
    }


    this._localStorageService.watchStorage().subscribe((data) => {

      if (data.change === 'shop-cart') {
        this.shopCart = JSON.parse(localStorage.getItem('shop-cart'));
      }
   
    });

  }


}
