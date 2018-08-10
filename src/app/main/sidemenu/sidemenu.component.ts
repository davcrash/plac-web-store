import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { SidemenuService } from '../services/sidemenu.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidemenu',
  templateUrl: './sidemenu.component.html',
  styleUrls: ['./sidemenu.component.css']
})
export class SidemenuComponent implements OnInit {

  @Output() public closeSidemenu = new EventEmitter<any>();

  categories;
  idMenuSelected = null;
  beforeId = null;
  openWithBeforeId;

  constructor(
    private _sidemenuService: SidemenuService,
    private _navigate: Router
  ) { }

  ngOnInit() {
    this._sidemenuService.getCategories()
      .subscribe(res => {
        this.categories = res;
      }, err => {
        console.log(err);
      });
  }

  clickOnMenu(event) {
    this.idMenuSelected = event.currentTarget.attributes.id.value;
    this._navigate.navigate(["/categoria", this.idMenuSelected]);
    this.closeSidemenu.emit(true);
  }



}
