import { Component, OnInit, Input, OnChanges, SimpleChanges, } from '@angular/core';
import { BrandsService } from '../services/brands.service';
import { LocalStorageService } from '../../local-storage.service';

@Component({
  selector: 'app-brands',
  templateUrl: './brands.component.html',
  styleUrls: ['./brands.component.css']
})
export class BrandsComponent implements OnInit, OnChanges {


  @Input() categoryId: string;
  @Input() subcategoryId: string;
  brands;
  loader: boolean = true;
  constructor(
    private _brandsService: BrandsService,
    private _localStorageService: LocalStorageService
  ) { }

  ngOnInit() {
    this._localStorageService.watchStorage().subscribe((data) => {
      //Cuando cambien el filtro de tipo de mascota
      if (data.change === 'pet_filter') {
        this.loader=true;
        this.getBrands();
      }
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['categoryId'] && this.categoryId != '') {
      this.loader=true;
      this.subcategoryId = null;
      this.categoryId = changes['categoryId'].currentValue;
      this.getBrands();
    }
    if (changes['subcategoryId']) {
      this.subcategoryId = changes['subcategoryId'].currentValue;
      this.loader=true;
      this.getBrands();
    }
  }

  getBrands() {

    this._brandsService.getBrands(this.categoryId, localStorage.getItem("pet_filter"), this.subcategoryId)
      .subscribe(res => {
        this.brands = res;
      }, error => {
        console.log(error);
      }, () => {//Cuando ya la solicitud se completo ocultamos el loader
        this.loader = false;
      });
  }


}
