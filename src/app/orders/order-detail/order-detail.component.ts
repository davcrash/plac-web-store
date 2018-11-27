import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.css']
})
export class OrderDetailComponent implements OnInit {

  @Input() order: any;
  @Input() collapse: boolean;

  collapseOrder: boolean = null;
  orderResumed;


  JSON;//para usar stringify y parse en el html
  constructor() {
    this.JSON = JSON;//para usar stringify y parse en el html
  }
  ngOnInit() {
    
    (this.order.order_resumed) ? this.orderResumed = this.order.order_resumed : '';

    if (this.collapse != null) {
      this.collapseOrder = false;
    }
  }


  manageCollapsed(orderElement) {
    orderElement.dataset.iscollapsed = orderElement.dataset.iscollapsed === 'false' ? 'true' : 'false';
  }

}
