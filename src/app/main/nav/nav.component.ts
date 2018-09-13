import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { LocalStorageService } from '../../local-storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  @Input() public showElement = true;
  @Output() public opened = new EventEmitter<any>();
  @Output() public openedShopCar = new EventEmitter<any>();

  @Input() public _opened = true;
  @Input() public _openedShopCar = false;
  selectedPet: string;


  //Si dan click en el nav se cierra el carrito
  @Output() public closeShopCart = new EventEmitter<any>();


  constructor(
    private _localStorageService: LocalStorageService,
    private _router: Router
  ) { }

  ngOnInit() {
    this.selectedPet = localStorage.getItem('pet_filter');

    
    this._localStorageService.watchStorage().subscribe((data) => {

      //CARRITO DE COMPRA, ABRIR O CERRAR CARRO CUANDO SE AGREGAN PRODUCTOS
      if (data.change === 'shop-cart') {
        if (localStorage.getItem('flag') != "inShopCart") {
          this.openedShopCar.emit(true);
        }
      }
    });

  }

  closeShopCartEmit(){
    this.closeShopCart.emit(true);
  }



  showSideMenu() {
    this._opened = !this._opened;
    this.opened.emit(!this._opened);
  }

  showShopCar() {
    this.openedShopCar.emit(!this._openedShopCar);
  }

  selectPet(pet) {
    this.selectedPet = pet;
    this._localStorageService.setItem('pet_filter', pet);
  }

  onEnterSearch(searchInput) {
    let searchText = searchInput.value;
    searchText = searchText.trim();
    if (searchText != '') {
      searchInput.blur();//se quita el focus del input
      this._router.navigate(['search'], { queryParams: { queryText: searchText } });
    }

  }

}
