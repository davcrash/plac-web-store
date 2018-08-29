import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

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

  constructor(
    private _router: Router,
    private _route: ActivatedRoute
  ) { }

  ngOnInit() {
  }

  viewProduct() {
    this._router.navigate([this._route.snapshot['_routerState'].url.replace(/%20/g, ' ') + '/product', this.productId]);
  }
}
