import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PurchaseService } from '../services/purchase.service';
import { ShopCartService } from '../services/shop-cart.service';
import swal from 'sweetalert2'

@Component({
  selector: 'app-purchase-view',
  templateUrl: './purchase-view.component.html',
  styleUrls: ['./purchase-view.component.css']
})
export class PurchaseViewComponent implements OnInit {

  indexPlace;
  objectPlace;
  userAddresses;
  currentAddressFormatted;
  loaderInfo = false;
  loaderNewAddress = false;
  loaderNewOrder = false;
  addressSelected;

  paymentMethods;
  paymentDelivery = false;
  paymentMercadoPago = false;


  showSection = "myAddress";

  addressModel = {
    plac_user_address: {
      mainWay: "Calle",
      address1: "",
      address2: "",
      address3: "",
    },
    plac_user_name: "",
    plac_user_email: "",
    plac_user_telephone: "",
    plac_user_neighborhood: "",
    city_id: "",
    plac_user_id: "",
    plac_user_additional_info: ""
  }

  uid;

  constructor(private _route: ActivatedRoute, private _purchaseService: PurchaseService,
    private _shopCartService: ShopCartService, private _router: Router) { }

  ngOnInit() {

    //Tomamos el uid de la persona 
    this.uid = JSON.parse(localStorage.getItem("user_data")).plac_user_id;

    //Capturamos el parametro de la ruta
    this._route.params.subscribe(routeParam => {
      this.loaderInfo = true;
      this.indexPlace = routeParam.indexPlace;

      if (!JSON.parse(localStorage.getItem("shop-cart"))[this.indexPlace]) {
        this._router.navigate(['/']);
      } else {
        //Capturamos el objeto del lugar que esta en el carrito de compras
        this.objectPlace = JSON.parse(localStorage.getItem("shop-cart"))[this.indexPlace];


        //Consultamos las direcciones del cliente
        this.getUserAdresses();

        //Consultamos los metodos de pago de la mepresa
        this.getPaymentMethods(this.objectPlace.place.place_id);
      }

    });

  }

  getPaymentMethods(placeId) {
    var object = {
      place_id: placeId
    }
    this.paymentMethods = null;
    this.paymentDelivery = false;
    this.paymentMercadoPago = false;
    this._purchaseService.getPaymentMethods(object).subscribe(data => {
      this.paymentMethods = data;
      if (!this.paymentMethods.mercadoPagoAvailable) {
        this.paymentDelivery = true;
      } else if (!this.paymentMethods.paymentDeliveryAvailable) {
        this.paymentMercadoPago = true;
      }


    }, error => {
      console.log(error);
      swal("Opps..","Ocurrio un error obteniendo los metodos de pago","error");
    })
  }

  selectPaymentMethod(paymentMethod) {
    switch (paymentMethod) {
      case 'paymentDelivery':
        this.paymentMercadoPago = false;
        break;
      case 'paymentMercadoPago':
        this.paymentDelivery = false;
        break;
    }
  }

  getUserAdresses() {
    this._purchaseService.getuserAddresses(this.uid).subscribe(data => {
      this.userAddresses = data;

      if (this.userAddresses.length > 0) {
        //Le damos formato a la direccion 
        this.addressSelected = this.userAddresses[0];
        this.currentAddressFormatted = this.formatterAddress(this.addressSelected.plac_user_address);
      } else {
        this.showSection = "formAddress";
      }


      this.loaderInfo = false;
    }, error => {
      this.showSection = "changeAddress";
      swal("Opps..","Ocurrio un error obteniendo tus direcciones","error");
      console.log(error);
    });

  }

  formatterAddress(addressJSON) {
    addressJSON = JSON.parse(addressJSON);
    return addressJSON.mainWay + " " + addressJSON.address1 + " # " + addressJSON.address2 + " - " + addressJSON.address3;
  }



  selectAddres(address) {
    this.addressSelected = address;
    this.currentAddressFormatted = this.formatterAddress(address.plac_user_address);
    this.showSection = 'myAddress';
  }


  addNewAddress() {
    this.loaderNewAddress = true;
    this.addressModel.plac_user_id = this.uid;
    this.addressModel.city_id = localStorage.getItem("city");

    this._purchaseService.addNewAddress(this.addressModel).subscribe(response => {
      this.getUserAdresses();

      this.loaderNewAddress = false;
      this.showSection = 'myAddress';

    }, error => {
      swal("Opps..","Ocurrio un error agregando la información","error");
      console.log(error)
      this.loaderNewAddress = false;
    })

  }


  buyOrder() {
    this.loaderNewOrder = true;
    var methodSelected;

    if (this.paymentDelivery) {
      methodSelected = "payment_delivery";
    } else if (this.paymentMercadoPago) {
      methodSelected = "payment_mercadoPago"
    }


    var orderModel = {
      paymentTypeSelected: methodSelected,
      orderDetails: [],
      orderResumed: {
        subTotal: this.objectPlace.total,
        total: this.objectPlace.total + 5000,
        shippingPrice: 5000
      },
      placUserShippingAddress: {
        plac_user_shipping_address_id: this.addressSelected.plac_user_shipping_address_id,
        plac_user_id: this.addressSelected.plac_user_id,
        plac_user_name: this.addressSelected.plac_user_name,
        plac_user_email: this.addressSelected.plac_user_email
      }

    }

    this.objectPlace.order_detail.forEach(element => {

      orderModel.orderDetails.push({
        place_id: this.objectPlace.place.place.place_id,
        product_id: element.product.product_id,
        quantity: element.quantity,
        price: element.product.product_price,
        discount: 0,
        total: element.totalProduct,
      });
    });

    var orderEncrypted = {
      order: this.encryptData(JSON.stringify(orderModel))
    }

    this._purchaseService.createOrder(orderEncrypted).subscribe(response => {
      this.manageOrderSuccess(response);
      this.loaderNewOrder = false;
    }, error => {
      swal("Opps..","Ocurrio un error creando la orden","error");
      console.log(error);
      this.loaderNewOrder = false;
    });


  }

  encryptData(str) {
    var encoded = "";
    for (var i = 0; i < str.length; i++) {
      var a = str.charCodeAt(i);
      var b = a ^ 6;
      encoded = encoded + String.fromCharCode(b);
    }
    return encoded;
  }

  manageOrderSuccess(response) {
    //Eliminamos la orden del carrito de compras
    this._shopCartService.removePlace(this.indexPlace);

    if (this.paymentDelivery) {
      //Mostramos alerta 
      swal({
        title: 'Correcto',
        text: "La orden fue procesada, PLAC la enviará a la dirección de domicilio seleccionada, Muchas gracias.",
        type: 'success',
        confirmButtonText: 'OK',
        allowOutsideClick: false,
        allowEscapeKey: false
      }).then((result) => {
        if (result.value) {
          //redirigimos
          if (JSON.parse(localStorage.getItem("shop-cart")).length > 0) {
            //redirigimos a compra/0
            this._router.navigate(['/compra/0']);
          } else {
            //redirigimos a /
            this._router.navigate(['/']);
          }
        }
      })

    } else if (this.paymentMercadoPago) {
      swal({
        title: 'Correcto',
        text: "Te redirigeremos a Mercado Pago para que realices el pago correspondiente, Muchas gracias.",
        type: 'success',
        confirmButtonText: 'Ir a Mercado Pago',
        allowOutsideClick: false,
        allowEscapeKey: false
      }).then((result) => {
        if (result.value) {
          //redirigimos a mercado pago
          location.href = response.data.object.response.init_point;

        }
      })
    }
  }

}
