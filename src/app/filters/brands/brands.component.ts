import { Component, OnInit, Input, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';
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


  @Input() needReset?: boolean = false;

  @Output() public brandSelected = new EventEmitter<any>();
  
  brands;
  loader: boolean = true;
  productBrandSelected: string;


  constructor(
    private _brandsService: BrandsService,
    private _localStorageService: LocalStorageService
  ) { }

  ngOnInit() {
    this._localStorageService.watchStorage().subscribe((data) => {
      //Cuando cambien el filtro de tipo de mascota
      if (data.change === 'pet_filter') {
        this.loader = true;
        this.getBrands();
      }
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['needReset']) {
      this.productBrandSelected = null;
      if (changes['needReset'].currentValue == 'category') {
        this.loader = true;
        this.subcategoryId = null;
        this.getBrands();
      }
    }
    if (changes['categoryId'] && this.categoryId != '') {
      this.productBrandSelected = null;
      this.loader = true;
      this.subcategoryId = null;
      this.categoryId = changes['categoryId'].currentValue;
      this.getBrands();
    }
    if (changes['subcategoryId']) {
      this.productBrandSelected = null;
      this.subcategoryId = changes['subcategoryId'].currentValue;
      this.loader = true;
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

  selectBrand(brand) {
    this.productBrandSelected = brand;
    this.brandSelected.emit(this.productBrandSelected);
  }

}
