import { Component, OnInit, ViewChild } from '@angular/core';
import { Location } from '@angular/common';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductModalService } from '../services/product-modal.service';
import { ShopCartService } from '../../shop-cart/services/shop-cart.service';
import swal from 'sweetalert';
import { FormatService } from 'src/app/format.service';

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

  quantityToAddToCart = 1; //Cantidad para agregar por defecto
  productInCart;

  question = {
    product_id: "",
    place_id: "",
    plac_user_id: "",
    question_txt: "",
  }

  textButtonQuestion = "Preguntar";
  questionGenerated;
  uid;

  JSON;//para usar stringify y parse en el html
  constructor(
    private _modalService: NgbModal,
    private _route: ActivatedRoute,
    private _location: Location,
    private _router: Router,
    private _productModalService: ProductModalService,
    private _shopCartService: ShopCartService,
    private _formatService: FormatService
  ) {
    this.JSON = JSON;//para usar stringify y parse en el html
  }

  ngOnInit() {

    this.uid = (localStorage.getItem("user_data")) ? JSON.parse(localStorage.getItem("user_data")).plac_user_id : '';

    this._route.params.subscribe(routeParam => {
      this.productId = routeParam.id;
      //this.productName = this._formatService.unformatString(routeParam.name);
      this._productModalService.getProductById(this.productId)
        .subscribe(res => {
          this.product = res.data;

          if (!routeParam.name) {
            let queryParams = this._route.snapshot.queryParams;
            let url = this._router.createUrlTree([this._formatService.formatString(this.product.product_name)], { relativeTo: this._route, queryParams })
              .toString();
            //this._router.navigate([url]);
            this._location.go(url);
          } else {
            if (this.product.product_name.trim().toLowerCase() != this._formatService.unformatString(routeParam.name).toLowerCase()) {
              let queryParams = this._route.snapshot.queryParams;
              let url = this._router.createUrlTree(
                ['../' + this._formatService.formatString(this.product.product_name)], { relativeTo: this._route, queryParams }
              )
                .toString();
              //this._router.navigate([url]);
              this._location.go(url);
            }
          }


          this.product.questions.reverse();
          let maxLength = 170;
          if (this.product.product_description.length > maxLength) {

            this.productShortDescription = this.product.product_description.substring(0, maxLength).trim().concat('...');
            this.productViewDescription = this.productShortDescription
          } else {
            this.productViewDescription = this.product.product_description;
          }

          //Consultamos si esta en el carrito
          this.productInCart = this._shopCartService.getProductInCart(this.product)
          this.quantityToAddToCart = this.productInCart.quantity;

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
        this.redirectCloseModal();
      }, () => {
        //regresar atras si se da click afuera
        this.redirectCloseModal();

      });

    }, 1);

  }

  redirectCloseModal() {
    var url;
    let queryParams = this._route.snapshot.queryParams;
    try {
      url = this._router.createUrlTree(['../../../'], { relativeTo: this._route, queryParams }).toString().replace(/%20/g, ' ');
    } catch (error) {
      url = this._router.createUrlTree(['../../'], { relativeTo: this._route, queryParams }).toString().replace(/%20/g, ' ');
    }
    this._router.navigateByUrl(url);
    //(window.history.length > 2) ? this._location.back() : this._router.navigate(['../../../'], { relativeTo: this._route, replaceUrl: true });
    //this._router.navigate(['../../../'], { relativeTo: this._route });
    //this._location.back()
  }

  viewMoreText() {
    (this.product.product_description === this.productViewDescription) ? this.productViewDescription = this.productShortDescription : this.productViewDescription = this.product.product_description
  }

  sendNewQuestion() {

    if (this.uid) {
      this.question.place_id = this.product.place_location.place_id;
      this.question.product_id = this.product.product_id;
      this.question.plac_user_id = this.uid;

      this.textButtonQuestion = "Enviando...";
      this._productModalService.sendNewQuestion(this.question).subscribe(data => {
        this.question.question_txt = '';
        this.questionGenerated = data.data;
        this.product.questions.unshift(this.questionGenerated);

        //this.product.questions.reverse();
        this.textButtonQuestion = "Preguntar";
      }, error => {
        console.log(error);
        this.textButtonQuestion = "Preguntar";
      });
    } else {
      swal({
        title: 'Inicia sesión',
        text: 'Para realizar tus compras, primero debes iniciar sesión',
        icon: 'info',
        buttons: ["Más tarde", "Iniciar sesión"],
      }).then((value) => {
        if (value === true) {
          this._router.navigate(['login']);
        }
      });
    }



  }

  addUnits() {
    if (this.quantityToAddToCart <= 50) {
      this.quantityToAddToCart = (this.quantityToAddToCart + 1);
      this.productInCart.totalProduct = this.product.product_price * this.quantityToAddToCart;
    }
  }

  removeUnits() {
    if (this.quantityToAddToCart > 1) {
      this.quantityToAddToCart = (this.quantityToAddToCart - 1);
      this.productInCart.totalProduct = this.product.product_price * this.quantityToAddToCart;
    }
  }

  addProductToCart() {
    this._shopCartService.addProductToCart(this.product, this.quantityToAddToCart, true);
  }


  goToLogin() {

    setTimeout(() => {
      this._router.navigate(['login']);
    }, 16);

  }

  shareProduct(destination) {
    console.log(this.product.product_dynamic_link);
    switch (destination) {
      case 'facebook':
        window.open(`http://www.facebook.com/sharer.php?u=${this.product.product_dynamic_link}`,
          'facebookwindow',
          'toolbar=0, status=0, width=650, height=650');
        break;
      case 'pinterest':
        window.open(`http://www.pinterest.com/pin/create/bookmarklet/?url=${this.product.product_dynamic_link}&media=${JSON.parse(this.product.product_images)[0].url}&is_video=false&description=${this.product.product_description}`,
          'pinterestwindow',
          'toolbar=0, status=0, width=650, height=650');
        break;
      case 'twitter':

        window.open(`https://twitter.com/intent/tweet?url=${this.product.product_dynamic_link}&text=${this.product.product_description.replace("%", "%25")}&via=placapp&`,
          'twitterwindow',
          'toolbar=0, status=0, width=650, height=650');

        break;

    }

  }

}
