import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { LocalStorageService } from '../../local-storage.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  @Input() public showElement = true;
  @Output() public opened = new EventEmitter<any>();
  _opened = true;
  selectedPet: string;

  constructor(
    private _localStorageService: LocalStorageService
  ) { }

  ngOnInit() {
    this.selectedPet = localStorage.getItem('pet_filter');
  }

  showSideMenu() {
    this.opened.emit(!this._opened);
  }

  selectPet(pet) {
    this.selectedPet = pet;
    this._localStorageService.setItem('pet_filter', pet);
  }

}
