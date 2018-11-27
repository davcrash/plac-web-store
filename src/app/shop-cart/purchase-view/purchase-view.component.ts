import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PurchaseService } from '../services/purchase.service';
import { ShopCartService } from '../services/shop-cart.service';
import swal from 'sweetalert'

@Component({
  selector: 'app-purchase-view',
  templateUrl: './purchase-view.component.html',
  styleUrls: ['./purchase-view.component.css']
})
export class PurchaseViewComponent implements OnInit {


  departments;
  departmentSelected = "";
  cities;
  shippingPrice;


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

  couponText: string;
  couponInfo = {
    message: null,
    coupon: null,
    status: null
  }

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
    //Se consultan los departamentos
    this._purchaseService.getDepartments()
      .subscribe(result => this.departments = result
        , error => {
          console.log(error);
          swal("Opps..", "Ocurrio un error obteniendo los departamentos", "error")
        });

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
        //this.getPaymentMethods(this.objectPlace.place.place_id);
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

    }, error => {
      console.log(error);
      swal("Opps..", "Ocurrio un error obteniendo los metodos de pago", "error");
    })
  }

  getPaymentMethodsAndCityPrice(placeId, cityId, productType) {

    this.paymentMethods = null;
    this.paymentDelivery = false;
    this.paymentMercadoPago = false;

    let request = {
      place_id: placeId,
      plac_user_city_id: cityId,
      product_type: productType
    }
    this._purchaseService.getPaymentMethodsAndCityPrice(request)
      .subscribe(result => {
        this.paymentMethods = result.data.payment_methods_available;
        this.shippingPrice = JSON.parse(result.data.city_price.price);
      }, error => {
        console.log(error);
        swal("Opps..", "Ocurrio un error obteniendo los metodos de pago", "error");
      });
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
        //this.addressSelected = this.userAddresses[0];
        this.selectAddres(this.userAddresses[0]);
        this.currentAddressFormatted = this.formatterAddress(this.addressSelected.plac_user_address);
      } else {
        this.showSection = "formAddress";
      }


      this.loaderInfo = false;
    }, error => {
      this.showSection = "changeAddress";
      swal("Opps..", "Ocurrio un error obteniendo tus direcciones", "error");
      console.log(error);
    });

  }

  formatterAddress(addressJSON) {
    addressJSON = JSON.parse(addressJSON);
    return addressJSON.mainWay + " " + addressJSON.address1 + " # " + addressJSON.address2 + " - " + addressJSON.address3;
  }



  selectAddres(address) {
    this.couponInfo = {
      message: null,
      coupon: null,
      status: null
    }
    this.couponText = '';
    this.getPaymentMethodsAndCityPrice(this.objectPlace.place.place_id, address.city_id, 'product');
    this.addressSelected = address;
    this.currentAddressFormatted = this.formatterAddress(address.plac_user_address);
    this.showSection = 'myAddress';
  }


  addNewAddress() {
    this.loaderNewAddress = true;
    this.addressModel.plac_user_id = this.uid;

    this._purchaseService.addNewAddress(this.addressModel).subscribe(response => {
      this.getUserAdresses();

      this.loaderNewAddress = false;
      this.showSection = 'myAddress';

    }, error => {
      swal("Opps..", "Ocurrio un error agregando la información", "error");
      console.log(error)
      this.loaderNewAddress = false;
    })

  }


  buyOrder() {

    this.loaderNewOrder = true;
    let methodSelected;

    if (this.paymentDelivery) {
      methodSelected = "payment_delivery";
    } else if (this.paymentMercadoPago) {
      methodSelected = "mercado_pago"
    }


    let orderModel = {
      payment_method_id: methodSelected,
      order_details: [],
      order_resumed: {
        subTotal: this.objectPlace.total,
        total: this.objectPlace.total + this.shippingPrice,
        shipping_price: this.shippingPrice,
        //cambiar los temp
        subTotal_tmp: (this.couponInfo.coupon) ? this.couponInfo.coupon.resumed.subTotal : this.objectPlace.total,
        shipping_price_tmp: (this.couponInfo.coupon) ? this.couponInfo.coupon.resumed.shipping_price : this.shippingPrice
      },
      plac_user_shipping_address: {
        ...this.addressSelected
      },
      place_location: {
        place: {
          path_image_logo: this.objectPlace.place.place.path_image_logo,
          place_id: this.objectPlace.place.place.place_id
        },
        place_id: this.objectPlace.place.place_id,
        place_location_id: this.objectPlace.place.place_location_id,
        place_location_name: this.objectPlace.place.place_location_name
      },
      products_type: 'products',
      coupon: (this.couponInfo.coupon) ? {
        coupon_detail_id: this.couponInfo.coupon.coupon_detail_id,
        coupon_id: this.couponInfo.coupon.coupon_id,
        coupon_type: this.couponInfo.coupon.coupon_type,
        coupon_amount: this.couponInfo.coupon.coupon_amount,
      } : null
    }

    this.objectPlace.order_detail.forEach(element => {

      orderModel.order_details.push({
        place_id: this.objectPlace.place.place.place_id,
        product_id: element.product.product_id,
        quantity: element.quantity,
        price: element.product.product_price,
        discount: 0,
        total: element.totalProduct,
      });
    });


    let order = {
      order: {
        ...orderModel
      }
    };

    this._purchaseService.createOrderV2(order).subscribe(response => {
      console.log(response);

      if (response.status == 'success') {
        this.manageOrderSuccess(response);
      } else {
        swal("Opps..", "Ocurrio un error creando la orden", "error");
      }

    }, error => {
      swal("Opps..", "Ocurrio un error creando la orden", "error");
      console.log(error);
      this.loaderNewOrder = false;
    });

    /*
        var orderEncrypted = {
          order: this.encryptData(JSON.stringify(orderModel))
        }
    
        this._purchaseService.createOrder(orderEncrypted).subscribe(response => {
          this.manageOrderSuccess(response);
          this.loaderNewOrder = false;
        }, error => {
          swal("Opps..", "Ocurrio un error creando la orden", "error");
          console.log(error);
          this.loaderNewOrder = false;
        });
    */

  }

  applyCoupon() {
    this.couponText = this.couponText.trim();
    if (this.couponText != '') {

      this._purchaseService.checkCoupon(this.couponText, this.uid, this.objectPlace.place.place_id, this.objectPlace.total + this.shippingPrice, this.objectPlace.total, this.shippingPrice)
        .subscribe(result => {
          console.log(result);
          this.couponInfo.coupon = result.data;
          this.couponInfo.message = result.message;
          this.couponInfo.status = result.status;
        }, error => {
          swal("Opps..", "Ocurrio un error creando la orden", "error");
          console.log(error);
        });

    }


  }

  manageOrderSuccess(response) {
    //Eliminamos la orden del carrito de compras
    this._shopCartService.removePlace(this.indexPlace);

    if (this.paymentDelivery) {
      this.loaderNewOrder = false;
      this._router.navigate([`/orden/${response.data.order_id}/CE`]);

      //Mostramos alerta 
      /*
      swal({

        title: 'Correcto',
        text: "La orden fue procesada, PLAC la enviará a la dirección de domicilio seleccionada, Muchas gracias.",
        icon: 'success',
        closeOnEsc: false,
        closeOnClickOutside: false
      }).then((result) => {
        if (result) {
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
*/
    } else if (this.paymentMercadoPago) {


      //redirigimos a mercado pago
      //window.open(response.data.object.response.init_point, "_blank");
      //this._router.navigate([`/orden/${response.data.object.response.external_reference}/MP`]);
      
      location.href = response.data.mercado_pago.response.init_point;
      /*
            swal({
              title: 'Correcto',
              text: "Te redirigeremos a Mercado Pago para que realices el pago correspondiente, Muchas gracias.",
              icon: 'success',
              buttons: [false, 'Ir a Mercado Pago'],
              closeOnEsc: false,
              closeOnClickOutside: false
            }).then((result) => {
              if (result) {
                //redirigimos a mercado pago
                location.href = response.data.object.response.init_point;
      
              }
            })*/
    }
  }

  selectDepartment() {
    this.addressModel.city_id = '';
    this._purchaseService.getCityByDepartmentId(this.departmentSelected)
      .subscribe(result => {
        this.cities = result;
      }, error => {
        console.log(error);
        swal("Opps..", "Ocurrio un error obteniendo las ciudades", "error")
      });
  }

}
