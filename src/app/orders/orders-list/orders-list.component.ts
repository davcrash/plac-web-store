import { Component, OnInit } from '@angular/core';
import { OrderService } from '../services/order.service';

@Component({
  selector: 'app-orders-list',
  templateUrl: './orders-list.component.html',
  styleUrls: ['./orders-list.component.css']
})
export class OrdersListComponent implements OnInit {


  orders;


  loader = true;


  constructor(private _orderService: OrderService) {
  }

  ngOnInit() {
    this.getOrders();
  }


  getOrders() {
    this._orderService.getOrderByUserId()
      .subscribe(result => {
        this.orders = result.data;
      }, error => {

      }, () => {
        this.loader = false;
      });
  }

  manageCollapsed(orderElement) {
    orderElement.dataset.iscollapsed = orderElement.dataset.iscollapsed === 'false' ? 'true' : 'false';
  }
}
