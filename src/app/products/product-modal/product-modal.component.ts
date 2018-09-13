import { Component, OnInit, ViewChild } from '@angular/core';
import { Location } from '@angular/common';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductModalService } from '../services/product-modal.service';

@Component({
  selector: 'app-product-modal',
  templateUrl: './product-modal.component.html',
  styleUrls: ['./product-modal.component.css']
})
export class ProductModalComponent implements OnInit {

  @ViewChild('productModal') modal;//modal element


  productId;
  product;
  loader: boolean = true;
  productShortDescription: string;
  productViewDescription: string;

  constructor(
    private _modalService: NgbModal,
    private _route: ActivatedRoute,
    private _location: Location,
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

          let maxLength = 170;
          if (this.product.product_description.length > maxLength) {

            this.productShortDescription = this.product.product_description.substring(0, maxLength).trim().concat('...');
            this.productViewDescription = this.productShortDescription
          } else {
            this.productViewDescription = this.product.product_description;
          }

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
        //this._router.navigate(['../../'], { relativeTo: this._route, replaceUrl: true });
        this._location.back();
      }, () => {
        //regresar atras si se da click afuera
        //this._router.navigate(['../../'], { relativeTo: this._route, replaceUrl: true });
        this._location.back();
      });

    }, 1);

  }

  vewMoreText() {
    (this.product.product_description === this.productViewDescription) ? this.productViewDescription = this.productShortDescription : this.productViewDescription = this.product.product_description
  }

}
