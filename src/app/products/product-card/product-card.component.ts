import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent implements OnInit {

  @Input() public productId:string;
  @Input() public imgProduct:string;
  @Input() public productName:string;
  @Input() public productPrice:any;

  constructor() { }

  ngOnInit() {
  }

}
