import { Component, OnInit, OnChanges } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { ViewCategoryService } from '../services/view-category.service';
import { LocalStorageService } from '../../local-storage.service';
import { element } from '../../../../node_modules/protractor';

@Component({
  selector: 'app-view-category',
  templateUrl: './view-category.component.html',
  styleUrls: ['./view-category.component.css']
})
export class ViewCategoryComponent implements OnInit {

  loader = false;

  //CategoryReceivedByRoute = this._route.snapshot.params['category_name'];
  categoryReceivedByRoute;//category_name
  subcategorySelected = "";

  placesWithProducts;

  constructor(
    private _route: ActivatedRoute,
    private _viewCatgoryService: ViewCategoryService,
    private _localStorageService: LocalStorageService
  ) { }

  ngOnInit() {

    //Cuando cambien el filtro de tipo de mascota
    this._localStorageService.watchStorage().subscribe((data) => {
      if (data.change === 'pet_filter') {
        this.getPlacesWithProducts();
      }
    });

    this._route.params.subscribe(routeParam => {
      this.categoryReceivedByRoute = routeParam.category_name;
      //Consultamos las empresas y sus productos
      this.subcategorySelected = "";
      this.getPlacesWithProducts();
    });
  }

  changeSubcategory(subcategory) {
    this.subcategorySelected = subcategory.subcategory_name;
    this.getPlacesWithProducts();
  }

  getPlacesWithProducts() {
    //Mostramos el loader para comenzar a hacer la solicitud
    this.loader = true;
    this._viewCatgoryService.getPlacesWithProducts(this.categoryReceivedByRoute, this.subcategorySelected).subscribe(result => {
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

  scrollRight(element) {
    var position = parseInt(element.getAttribute("position"));
    var maxScrollLeft = element.scrollWidth - element.clientWidth;
    var displacementScroll = 300;

    element.setAttribute("showLeft", "true");
    element.setAttribute("showRight", "true");

    element.scroll({
      left: position + displacementScroll, 
    behavior: 'smooth' });
    element.setAttribute("position", (parseInt(element.getAttribute("position")) + displacementScroll));
    //Si la posicion es mayor a max se esconde la flecha derecha
    if (position + displacementScroll >= maxScrollLeft) {
      element.setAttribute("showRight", "false");
    }
  }

  scrollLeft(element) {
    var position = parseInt(element.getAttribute("position"));
    var displacementScroll = 300;

    element.setAttribute("showRight", "true");
    element.setAttribute("showLeft", "true");

      element.scroll({
        left: position - displacementScroll,
        behavior:'smooth'
      });
      element.setAttribute("position", (parseInt(element.getAttribute("position")) - displacementScroll))
    //Si la posicion es menor a 0 se esconde la flecha izquierda
    if (position - displacementScroll <= 0) {
      element.setAttribute("showLeft", "false");
    } 

  }
}
