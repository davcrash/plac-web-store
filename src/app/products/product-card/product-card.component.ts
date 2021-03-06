import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormatService } from 'src/app/format.service';
import { LocalStorageService } from 'src/app/local-storage.service';
import { ShopCartService } from 'src/app/shop-cart/services/shop-cart.service';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent implements OnInit {

  @Input() public productId: string;
  @Input() public imgProduct: string;
  @Input() public productName: string;
  @Input() public productPrice: any;


  countInCart: number = 0;

  constructor(
    private _router: Router,
    private _route: ActivatedRoute,
    private _formatService: FormatService,
    private _localStorageService: LocalStorageService,
    private _shopCartService: ShopCartService
  ) { }

  ngOnInit() {
    this.countInCart = this._shopCartService.getProductCount(this.productId);
    this._localStorageService.watchStorage().subscribe((data) => {
      if (data.change === 'shop-cart') {
        this.countInCart = this._shopCartService.getProductCount(this.productId);
      }
    });
  }

  viewProduct() {
    let queryParams = this._route.snapshot.queryParams;
    this._router
      .navigate(
        [`producto/${this.productId}/${this._formatService.formatString(this.productName)}`],
        { relativeTo: this._route, queryParams: queryParams }
      );
    //this._router.navigate(['producto', this._formatService.formatString(this.productName)], { relativeTo: this._route, queryParams: queryParams });
  }
}
