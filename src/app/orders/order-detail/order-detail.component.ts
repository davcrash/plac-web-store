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

  JSON;//para usar stringify y parse en el html
  constructor() {
    this.JSON = JSON;//para usar stringify y parse en el html
  }
  ngOnInit() {
    if (this.collapse != null) {
      this.collapseOrder = false;
    }
  }

  reloadPage() {
    location.reload();
  }

  manageCollapsed(orderElement) {
    orderElement.dataset.iscollapsed = orderElement.dataset.iscollapsed === 'false' ? 'true' : 'false';
  }

}
