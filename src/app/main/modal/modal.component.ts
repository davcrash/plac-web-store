import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {

  @Output() modalClose: EventEmitter<any> = new EventEmitter<any>();
  constructor(
    private _router: Router
  ) { }

  ngOnInit() {
  }


  closeModal($event) {
    this._router.navigate([{ outlets: {primary: ['login'], modal: null } }]);
    this.modalClose.next($event);
  }
}
