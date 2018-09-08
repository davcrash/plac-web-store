import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductModalService } from '../services/product-modal.service';
import { ShopCartService } from '../../shop-cart/services/shop-cart.service';

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


  question = {
    product_id: "",
    place_id: "",
    plac_user_id: "",
    question_txt: "",
  }

  textButtonQuestion = "Preguntar";
  questionGenerated;

  productInCart;

  constructor(
    private _modalService: NgbModal,
    private _route: ActivatedRoute,
    private _router: Router,
    private _productModalService: ProductModalService,
    private _shopCartService: ShopCartService
  ) {
  }

  ngOnInit() {
    this._route.params.subscribe(routeParam => {
      this.productId = routeParam.id;
      this._productModalService.getProductById(this.productId)
        .subscribe(res => {
          this.product = res;
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
        //this._location.back();
        this._router.navigate(['../../'], { relativeTo: this._route });
      }, () => {
        //regresar atras si se da click afuera
        //this._location.back();
        this._router.navigate(['../../'], { relativeTo: this._route });
      });

    }, 1);

  }

  vewMoreText() {
    (this.product.product_description === this.productViewDescription) ? this.productViewDescription = this.productShortDescription : this.productViewDescription = this.product.product_description
  }

  senNewQuestion() {
    this.question.place_id = this.product.place_location.place_id;
    this.question.product_id = this.productId;
    this.question.plac_user_id = "04MUa3jkiL";

    this.textButtonQuestion = "Enviando...";
    this._productModalService.sendNewQuestion(this.question).subscribe(data => {
      this.questionGenerated = data;
      this.product.questions.push(this.questionGenerated);
      this.product.questions.reverse();
      this.textButtonQuestion = "Preguntar";
    }, error => {
      console.log(error);
      this.textButtonQuestion = "Preguntar";
    });
  }

  addUnits(){
    if(this.quantityToAddToCart <= 50){
      this.quantityToAddToCart = (this.quantityToAddToCart + 1);
      this.productInCart.totalProduct = this.product.product_price * this.quantityToAddToCart;
    }
  }

  removeUnits(){
    if(this.quantityToAddToCart >1){
      this.quantityToAddToCart = (this.quantityToAddToCart - 1);
      this.productInCart.totalProduct = this.product.product_price * this.quantityToAddToCart;
    }
  }

  addProductToCart(){
    this._shopCartService.addProductToCart(this.product, this.quantityToAddToCart);  
  }


  removeProductInCart(){

  }

}
