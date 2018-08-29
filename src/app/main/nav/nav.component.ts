import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { LocalStorageService } from '../../local-storage.service';

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

  constructor(
    private _localStorageService: LocalStorageService
  ) { }

  ngOnInit() {
    this.selectedPet = localStorage.getItem('pet_filter');
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

}
