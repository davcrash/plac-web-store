import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-product-modal',
  templateUrl: './product-modal.component.html',
  styleUrls: ['./product-modal.component.css']
})
export class ProductModalComponent implements OnInit {

  @ViewChild('productModal') modal;//modal element


  product_id;

  constructor(
    private _modalService: NgbModal,
    private _route: ActivatedRoute,
    private _router: Router,
  ) {
  }

  ngOnInit() {
    this._route.params.subscribe(routeParam => {
      this.product_id = routeParam.id;
    });
  }

  ngAfterViewInit() {
    setTimeout(() => {//el timeOut es para evitar un error 

      //abrir modal 
      this._modalService.open(this.modal, { size: 'lg' }).result.then(() => {
        //regresar atras si se cierra
        //this._location.back();
        this._router.navigate(['../../'], { relativeTo: this._route });
      }, () => {
        //regresar atras si se da click afuera
        //this._location.back();
        this._router.navigate(['../../'], { relativeTo: this._route });
      });

    }, 1);

  }

}
