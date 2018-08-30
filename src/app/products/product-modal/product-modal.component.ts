import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductModalService } from '../services/product-modal.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-product-modal',
  templateUrl: './product-modal.component.html',
  styleUrls: ['./product-modal.component.css']
})
export class ProductModalComponent implements OnInit {

  @ViewChild('productModal') modal;//modal element


  productId;
  product: Observable<any>;
  loader: boolean = true;


  constructor(
    private _modalService: NgbModal,
    private _route: ActivatedRoute,
    private _router: Router,
    private _productModalService: ProductModalService
  ) {
  }

  ngOnInit() {
    this._route.params.subscribe(routeParam => {
      this.productId = routeParam.id;
      this._productModalService.getProductById(this.productId)
        .subscribe(res => {
          this.product = res;
          this.loader = false
        }, error => {
          console.log(error);
        }, () => {//Cuando ya la solicitud se completo ocultamos el loader
          this.loader = false;
        });
    });
  }

  ngAfterViewInit() {
    setTimeout(() => {//el timeOut es para evitar un error 

      //abrir modal 
      this._modalService.open(this.modal, { size: 'lg' }).result.then(() => {
        //regresar atras si se cierra
        //this._location.back();
        this._router.navigate(['../../'], { relativeTo: this._route});
      }, () => {
        //regresar atras si se da click afuera
        //this._location.back();
        this._router.navigate(['../../'], { relativeTo: this._route });
      });

    }, 1);

  }

}
