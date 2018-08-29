import { Component, OnInit, ViewChild, AfterViewInit, ViewEncapsulation } from '@angular/core';
import { Location } from '@angular/common';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit, AfterViewInit {

  @ViewChild('content') modal;//modal element



  constructor(
    private _modalService: NgbModal,
    private _location: Location
  ) {
  }

  ngOnInit() {

  }

  ngAfterViewInit() {
    setTimeout(() => {//el timeOut es para evitar un error 

      //abrir modal 
      this._modalService.open(this.modal).result.then(() => {
        //regresar atras si se cierra
        this._location.back();
      }, () => {
        //regresar atras si se da click afuera
        this._location.back();
      });

    }, 1);

  }



}
