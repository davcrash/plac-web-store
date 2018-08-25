import { Component, OnInit, Input } from '@angular/core';
import { Router ,ActivatedRoute} from '@angular/router';

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

  constructor(
    private _router: Router,
    private _activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
  }

  prueba(){
    this._router.navigate([{outlets: { modal: 'other' }}], {  relativeTo: this._activatedRoute })
  }
}
