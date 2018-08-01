import { Component, OnInit } from '@angular/core';
import { SidemenuService } from '../services/sidemenu.service';

@Component({
  selector: 'app-sidemenu',
  templateUrl: './sidemenu.component.html',
  styleUrls: ['./sidemenu.component.css']
})
export class SidemenuComponent implements OnInit {

  categories;
  idMenuCollapsed = null;
  beforeId = null;
  openWithBeforeId;

  constructor(
    private _sidemenuService: SidemenuService
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

  clickOnMenu(event, elmtId) {
    this.idMenuCollapsed = event.currentTarget.attributes.id.value;
    
    if(this.beforeId == elmtId){
      this.openWithBeforeId=true;
      this.beforeId = null;
    }else{
      this.openWithBeforeId=false;
      this.beforeId = elmtId;
    }
    
    
  }

  clickOnSubMenu(){
    this.beforeId = null;
  }

}
