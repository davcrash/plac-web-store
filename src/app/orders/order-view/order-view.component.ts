import { Component, OnInit, Input, AfterViewChecked, AfterViewInit } from '@angular/core';
import { OrderService } from '../services/order.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-order-view',
  templateUrl: './order-view.component.html',
  styleUrls: ['./order-view.component.css']
})
export class OrderViewComponent implements OnInit {

  order: any;
  loader: boolean = true;
  showMessage: boolean = false;

  constructor(
    private _orderService: OrderService,
    private _route: ActivatedRoute
  ) {
  }


  ngOnInit() {
    this.showMessage = this._route.snapshot.params['pago'];


    let order = this._orderService.order;
    if (!order) {
      this.getOrderById();
    } else {
      this.setOrderPropieties(order);
    }

  }


  getOrderById() {
    
    this._orderService.getOrderById(this._route.snapshot.params['id'])
      .subscribe(result => {
        this.setOrderPropieties(result.data[0]);
      }, error => {
        console.log(error);
      }, () => {
        this.loader = false;
      });
  }

  setOrderPropieties(order) {
    this.order = order;
  }

}
