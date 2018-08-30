import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { PlaceWithProductsService } from '../services/place-with-products.service';
import { LocalStorageService } from '../../local-storage.service';

@Component({
  selector: 'app-place-with-products',
  templateUrl: './place-with-products.component.html',
  styleUrls: ['./place-with-products.component.css']
})
export class PlaceWithProductsComponent implements OnInit {

  loader = false;

  //CategoryReceivedByRoute = this._route.snapshot.params['category_name'];

  categories; //category_name//category_image//category_icon_url//category_color

  categoryReceivedByRoute;//category_name by route

  categoryPropieties = {
    category_color: "",
    category_icon_url: "",
    category_id:"",
    category_img_url:"",
    category_name:""
  };

  subcategorySelected = "";
  subcategoryIdSelected = "";

  placesWithProducts;

  constructor(
    private _route: ActivatedRoute,
    private _placeWithProducts: PlaceWithProductsService,
    private _localStorageService: LocalStorageService
  ) { }

  ngOnInit() {
    this._route.params.subscribe(routeParam => {
      this.categoryReceivedByRoute = routeParam.category_name;
      //si las categorias estan llenas set las propiedades
      this.categories = JSON.parse(localStorage.getItem('categories'));
      (this.categories) ? this.setCategoryPropieties() : '';
      //Consultamos las empresas y sus productos
      this.subcategorySelected = "";
      this.getPlacesWithProducts();
    });
   
    this._localStorageService.watchStorage().subscribe((data) => {
       //Cuando cambien el filtro de tipo de mascota
      if (data.change === 'pet_filter') {
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
  }

  changeSubcategory(subcategory) {
    this.subcategorySelected = subcategory.subcategory_name;
    this.subcategoryIdSelected = subcategory.subcategory_id;
    this.getPlacesWithProducts();
  }

  getPlacesWithProducts() {
    //Mostramos el loader para comenzar a hacer la solicitud
    this.loader = true;
    this._placeWithProducts.getPlacesWithProducts(this.categoryReceivedByRoute, this.subcategorySelected).subscribe(result => {
      //Asignamos los datos a la variable de usuarios
      this.placesWithProducts = result;
    },
      error => {
        console.log(error);
      },
      () => {//Cuando ya la solicitud se completo ocultamos el loader
        this.loader = false;
      }
    );
  }

}