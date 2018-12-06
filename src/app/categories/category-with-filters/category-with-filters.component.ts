import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { CategoryWithFiltersService } from '../services/category-with-filters.service';
import { LocalStorageService } from '../../local-storage.service';

@Component({
  selector: 'app-category-with-filters',
  templateUrl: './category-with-filters.component.html',
  styleUrls: ['./category-with-filters.component.css']
})
export class CategoryWithFiltersComponent implements OnInit {


  loader = false;

  //CategoryReceivedByRoute = this._route.snapshot.params['category_name'];

  categories; //category_name//category_image//category_icon_url//category_color

  categoryReceivedByRoute;//category_name by route

  categoryPropieties = {
    category_color: "",
    category_icon_url: "",
    category_id: "",
    category_img_url: "",
    category_name: ""
  };

  subcategorySelected: string;
  subcategoryIdSelected = "";
  productBrandSelected: string;

  needResetBrand: string;
  needResetSubcategory: boolean = false;

  placesWithProducts;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _categoryWithFiltersService: CategoryWithFiltersService,
    private _localStorageService: LocalStorageService
  ) {
  }

  ngOnInit() {
    this._route.params.subscribe(routeParam => {
      this.categoryReceivedByRoute = routeParam.category_name;
      //si las categorias estan llenas set las propiedades
      this.categories = JSON.parse(localStorage.getItem('categories'));
      (this.categories) ? this.setCategoryPropieties() : '';
      //Consultamos las empresas y sus productos
      this.subcategorySelected = null;
      this.productBrandSelected = null;
      this.getPlacesWithProducts();
    });

    this._localStorageService.watchStorage().subscribe((data) => {
      //Cuando cambien el filtro de tipo de mascota
      if (data.change === 'pet_filter') {
        this.manageBreadcrumbs(1);
        this.getPlacesWithProducts();
      }
      //Cuando se llene las categorias
      if (data.change === 'categories') {
        this.categories = JSON.parse(localStorage.getItem('categories'));
        (this.categories) ? this.setCategoryPropieties() : '';
      }
    });


  }

  setCategoryPropieties() {
    this.categoryPropieties = this.categories.find(category => category.category_name === this.categoryReceivedByRoute);
    (this.categoryPropieties == undefined) ? this._router.navigate(['']) : '';
  }

  changeSubcategory(subcategory) {
    this.productBrandSelected = null;
    this.subcategorySelected = subcategory.subcategory_name;
    this.subcategoryIdSelected = subcategory.subcategory_id;
    this.getPlacesWithProducts();
  }

  changeBrand(brand) {
    this.productBrandSelected = brand;
    this.getPlacesWithProducts();
  }

  getPlacesWithProducts() {
    //Mostramos el loader para comenzar a hacer la solicitud
    this.loader = true;
    this._categoryWithFiltersService.getPlacesWithProducts(this.categoryReceivedByRoute, this.subcategorySelected, this.productBrandSelected)
      .subscribe(result => {
        this.placesWithProducts = result.data.data;
      }, error => {
        console.log(error);
      }, () => {//Cuando ya la solicitud se completo ocultamos el loader
        this.loader = false;
      });
  }

  manageBreadcrumbs(key) {
    switch (key) {
      case 1:
        if (this.subcategorySelected != null || this.productBrandSelected != null) {
          this.subcategorySelected = null;
          this.productBrandSelected = null;
          this.needResetBrand = 'category';
          this.needResetSubcategory = !this.needResetSubcategory;
          this.getPlacesWithProducts();
        }
        break;
      case 2:
        if (this.productBrandSelected != null) {
          this.productBrandSelected = null;
          this.needResetBrand += 'sub';
          this.getPlacesWithProducts();
        }
        break;
      case 3:
        //no hace nada
        break;

    }
  }


}
