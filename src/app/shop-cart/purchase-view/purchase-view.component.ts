import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PurchaseService } from '../services/purchase.service';
import { ShopCartService } from '../services/shop-cart.service';
import swal from 'sweetalert'
import { LocalStorageService } from 'src/app/local-storage.service';

@Component({
  selector: 'app-purchase-view',
  templateUrl: './purchase-view.component.html',
  styleUrls: ['./purchase-view.component.css']
})
export class PurchaseViewComponent implements OnInit {


  departments;
  countries;
  departmentSelected = "";
  countrySelected = 'COL';
  cities;
  shippingPrice;

  deleteIsActive: boolean = false;

  indexPlace;
  objectPlace;
  userAddresses;
  currentAddressFormatted;
  loaderInfo = false;
  loaderNewAddress = false;
  loaderNewOrder = false;
  addressSelected;

  paymentMethods;

  paymentMethodSelected: string = null;
  /*
  paymentDelivery = false;
  paymentMercadoPago = false;
*/

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

  addressIdToEdit: string = null;
  shippingFormSubmitted: boolean = false;//variable para mostrar los errores despues de enviar el formulario

  JSON;//para usar stringify y parse en el html
  constructor(private _route: ActivatedRoute, private _purchaseService: PurchaseService,
    private _shopCartService: ShopCartService, private _router: Router, private _localStorageService: LocalStorageService) {

    this.JSON = JSON;//para usar stringify y parse en el html
  }

  ngOnInit() {

    this._localStorageService.watchStorage().subscribe((data) => {
      //CARRITO DE COMPRA, ABRIR O CERRAR CARRO CUANDO SE AGREGAN PRODUCTOS
      if (data.change === 'shop-cart') {
        this.objectPlace = JSON.parse(localStorage.getItem("shop-cart"))[this.indexPlace];
        if (!this.objectPlace) {
          location.reload();
          if (!JSON.parse(localStorage.getItem("shop-cart"))[0]) {
            this._router.navigate(['/']);
          }
        }
      }
    });


    //Se consultan los paises
    this._purchaseService.getCountries()
      .subscribe(result => {
        this.countries = result.data
      }, error => {
        console.log(error);
        swal("Opps..", "Ocurrio un error obteniendo los departamentos", "error")
      });

    //Se consultan los departamentos
    this._purchaseService.getDepartments()
      .subscribe(result => {
        this.departments = result.data
      }, error => {
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
        this._router.navigate(['compra/0']);
      } else {

        //Capturamos el objeto del lugar que esta en el carrito de compras
        this.objectPlace = JSON.parse(localStorage.getItem("shop-cart"))[this.indexPlace];

        //Consultamos las direcciones del cliente
        this.getUserAdresses();

      }

    });

  }

  deleteAddress(address, index) {

    this.deleteIsActive = true;

    swal({
      title: '¿Seguro que deseas eliminar la dirección?',
      text: `Se eliminara la dirección ${(address.city.country_id != 'COL') ? JSON.parse(address.plac_user_address).mainWay : address.address_formatted}`,
      icon: 'warning',
      buttons: ["Cancelar", "Eliminar"]
    }).then((value) => {
      if (value === true) {
        this._purchaseService.deleteAddress(address.plac_user_shipping_address_id)
          .subscribe(result => {
            if (result.status == 'success') {
              this.userAddresses.splice(index, 1);
            } else {
              swal("Opps..", "Ocurrio un eliminando la dirección", "error");
            }
          }, error => {
            swal("Opps..", "Ocurrio un eliminando la dirección", "error");
            console.log(error);
          });
      }
    });


  }

  getPaymentMethodsAndCityPrice(placeId, cityId, productType) {

    this.paymentMethods = null;
    //this.paymentDelivery = false;
    //this.paymentMercadoPago = false;
    this.paymentMethodSelected = null;

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


  addUnit(index) {

    this.couponInfo = {
      message: null,
      coupon: null,
      status: null
    }
    this.couponText = '';

    let quantity = this.objectPlace.order_detail[index].quantity += 1;
    let product = this.objectPlace.order_detail[index].product;

    this.objectPlace.total = this._shopCartService.calculateTotalPlace(this.objectPlace);
    this.objectPlace.order_detail[index].totalProduct = quantity * parseFloat(product.product_price);

    this._shopCartService.addProductToCart(product, quantity, 'purchase');
  }

  decreaseUnit(index) {

    this.couponInfo = {
      message: null,
      coupon: null,
      status: null
    }
    this.couponText = '';

    var quantity = this.objectPlace.order_detail[index].quantity -= 1;
    var product = this.objectPlace.order_detail[index].product;

    this.objectPlace.total = this._shopCartService.calculateTotalPlace(this.objectPlace);
    this.objectPlace.order_detail[index].totalProduct = quantity * parseFloat(product.product_price);

    if (quantity <= 0) { //Estan eliminando un producto
      this.objectPlace.order_detail[index] = null;
      if (this._shopCartService.calculateTotalPlace(this.objectPlace) <= 0) {
        this.objectPlace = null;

      }
    }

    this._shopCartService.addProductToCart(product, quantity, 'purchase');

  }

  getUserAdresses() {
    this._purchaseService.getUserAddresses(this.uid).subscribe(data => {
      this.userAddresses = data.data;

      if (this.userAddresses.length > 0) {
        //Le damos formato a la direccion 
        //this.addressSelected = this.userAddresses[0];
        this.selectAddres(this.userAddresses[0]);
        (this.addressSelected.city.country_id == 'COL') ? this.currentAddressFormatted = this.addressSelected.address_formatted : this.currentAddressFormatted = JSON.parse(this.addressSelected.plac_user_address).mainWay;

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

  selectAddres(address) {
    if (!this.deleteIsActive) {
      this.couponInfo = {
        message: null,
        coupon: null,
        status: null
      }
      this.couponText = '';
      this.getPaymentMethodsAndCityPrice(this.objectPlace.place.place_id, address.city_id, 'product');
      this.addressSelected = address;
      (this.addressSelected.city.country_id == 'COL') ? this.currentAddressFormatted = this.addressSelected.address_formatted : this.currentAddressFormatted = JSON.parse(this.addressSelected.plac_user_address).mainWay;
      this.showSection = 'myAddress';
    } else {
      this.deleteIsActive = false;
    }

  }


  addNewAddress() {

    this.loaderNewAddress = true;
    this.addressModel.plac_user_id = this.uid;

    this._purchaseService.addNewAddress(this.addressModel).subscribe(response => {
      this.getUserAdresses();
      this.shippingFormSubmitted = false;
      this.loaderNewAddress = false;
      this.manageReturnSection();

    }, error => {
      swal("Opps..", "Ocurrio un error agregando la información", "error");
      console.log(error)
      this.shippingFormSubmitted = false;
      this.loaderNewAddress = false;
    });


  }

  selectToEditAddress() {
    this.showSection = "formAddressEditingCurrent";

    this.addressIdToEdit = this.addressSelected.plac_user_shipping_address_id
    this.addressModel.plac_user_name = this.addressSelected.plac_user_name;
    this.addressModel.plac_user_telephone = this.addressSelected.plac_user_telephone;
    this.addressModel.plac_user_email = this.addressSelected.plac_user_email;

    this.countrySelected = this.addressSelected.city['country_id'];
    this.selectCountry();

    if (this.countrySelected == 'COL') {
      this.departmentSelected = this.addressSelected.city['city_department/state'];
      this.selectDepartment();
    }
    this.addressModel.city_id = this.addressSelected.city['city_id'];

    this.addressModel.plac_user_address = JSON.parse(this.addressSelected.plac_user_address);

    this.addressModel.plac_user_neighborhood = this.addressSelected.plac_user_neighborhood;
    this.addressModel.plac_user_additional_info = this.addressSelected.plac_user_additional_info;

  }

  editAddress() {

    this.loaderNewAddress = true;
    this.addressModel.plac_user_id = this.uid;
    this._purchaseService.editAddress(this.addressIdToEdit, this.addressModel).subscribe(response => {
      this.getUserAdresses();
      this.shippingFormSubmitted = false;
      this.loaderNewAddress = false;
      this.manageReturnSection();

    }, error => {
      swal("Opps..", "Ocurrio un error agregando la información", "error");
      console.log(error)
      this.shippingFormSubmitted = false;
      this.loaderNewAddress = false;
    });
  }

  buyOrder() {

    this.loaderNewOrder = true;

    /*let methodSelected;

    if (this.paymentDelivery) {
      methodSelected = "payment_delivery";
    } else if (this.paymentMercadoPago) {
      methodSelected = "mercado_pago"
    }*/


    let orderModel = {
      payment_method_id: this.paymentMethodSelected,
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

    this._purchaseService.createOrder(order).subscribe(response => {


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

  }

  applyCoupon() {
    this.couponText = this.couponText.trim();
    if (this.couponText != '') {

      this._purchaseService.checkCoupon(this.couponText, this.uid, this.objectPlace.place.place_id, this.objectPlace.total + this.shippingPrice, this.objectPlace.total, this.shippingPrice)
        .subscribe(result => {
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

    if (this.paymentMethodSelected == 'payment_delivery') {

      this.loaderNewOrder = false;
      this._router.navigate([`/orden/${response.data.order_id}/CE`]);

    } else if (this.paymentMethodSelected == 'mercado_pago') {

      location.href = response.data.mercado_pago.response.init_point;

    }
  }

  selectDepartment() {
    this.addressModel.city_id = '';


    this._purchaseService.getCityByFilter(this.countrySelected, this.departmentSelected)
      .subscribe(result => {
        this.cities = result.data;
      }, error => {
        console.log(error);
        swal("Opps..", "Ocurrio un error obteniendo las ciudades", "error")
      });
  }

  selectCountry() {
    this.addressModel.city_id = '';
    if (this.countrySelected != "COL") {
      this.addressModel.plac_user_address.mainWay = '';
      this._purchaseService.getCityByFilter(this.countrySelected)
        .subscribe(result => {
          this.cities = result.data;
        }, error => {
          console.log(error);
          swal("Opps..", "Ocurrio un error obteniendo las ciudades", "error")
        });

    } else {
      this.addressModel.plac_user_address.mainWay = 'Calle';
      this.departmentSelected = "";
      this.cities = null;

    }
  }


  manageReturnSection() {
    if (this.showSection == 'formAddressEditingCurrent') {
      this.showSection = 'myAddress'
    } else {
      this.showSection = 'listAddress'
    }

    this.addressModel = {
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
    };
    this.countrySelected = "COL";
    this.departmentSelected = "";
    this.addressIdToEdit = null;
  }

}
