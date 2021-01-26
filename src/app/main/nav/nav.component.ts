import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  OnChanges,
  SimpleChanges,
} from "@angular/core";
import { LocalStorageService } from "../../local-storage.service";
import { Router } from "@angular/router";
import { LoginService } from "../../users/services/login.service";
import { ShopCartService } from "src/app/shop-cart/services/shop-cart.service";

@Component({
  selector: "app-nav",
  templateUrl: "./nav.component.html",
  styleUrls: ["./nav.component.css"],
})
export class NavComponent implements OnInit {
  @Input() public showElement = true;
  @Output() public opened = new EventEmitter<any>();
  @Output() public openedShopCar = new EventEmitter<any>();

  @Input() public _opened = true;
  @Input() public _openedShopCar = false;
  selectedPet: string;
  isLoggedin: boolean = false;
  userData: any;

  shopcartCount: number = 0;

  //Si dan click en el nav se cierra el carrito
  @Output() public closeShopCart = new EventEmitter<any>();

  constructor(
    private _localStorageService: LocalStorageService,
    private _router: Router,
    private _loginService: LoginService,
    private _shopCartService: ShopCartService
  ) {}

  ngOnInit() {
    this.shopcartCount = this._shopCartService.getCountProducts();
    this.selectedPet = localStorage.getItem("pet_filter");
    this.setUserData();

    this._localStorageService.watchStorage().subscribe((data) => {
      if (data.change === "user_data") {
        this.setUserData();
      }
      //CARRITO DE COMPRA, ABRIR O CERRAR CARRO CUANDO SE AGREGAN PRODUCTOS
      if (data.change === "shop-cart") {
        this.shopcartCount = this._shopCartService.getCountProducts();

        if (sessionStorage.getItem("flag-in-purchase")) {
          sessionStorage.removeItem("flag-in-purchase");
        } else {
          this.openedShopCar.emit(true);
        }
      }
    });
  }

  setUserData() {
    let user = localStorage.getItem("user_data");
    if (user) {
      this.isLoggedin = true;
      this.userData = JSON.parse(user);
    }
  }

  closeShopCartEmit() {
    this.closeShopCart.emit(true);
  }

  logout() {
    this.isLoggedin = false;
    this._loginService
      .logout()
      .then(() => {
        this._router.navigate([""]);
        window.location.reload();
      })
      .catch((error) => {
        console.log(error);
      });
  }

  showSideMenu() {
    this._opened = !this._opened;
    this.opened.emit(!this._opened);
  }

  showShopCar() {
    this._localStorageService.setItem("close-shopcart", "true");
    this.openedShopCar.emit(!this._openedShopCar);
  }

  selectPet(pet) {
    this.selectedPet = pet;
    this._localStorageService.setItem("pet_filter", pet);
  }

  onEnterSearch(searchInput) {
    let searchText = searchInput.value;
    searchText = searchText.trim();
    if (searchText != "") {
      searchInput.blur(); //se quita el focus del input
      this._router.navigate(["search"], {
        queryParams: { queryText: searchText },
      });
    }
  }
}
