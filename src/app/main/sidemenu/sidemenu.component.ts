import { Component, OnInit } from '@angular/core';
import { SidemenuService } from '../services/sidemenu.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidemenu',
  templateUrl: './sidemenu.component.html',
  styleUrls: ['./sidemenu.component.css']
})
export class SidemenuComponent implements OnInit {

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
        console.log(this.categories);
      }, err => {
        console.log(err);
      });
  }

  clickOnMenu(event) {

    this.idMenuSelected = event.currentTarget.attributes.id.value;
    this._navigate.navigate(["/categoria", this.idMenuSelected]);

  }



}
