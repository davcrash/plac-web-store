import { Injectable } from "@angular/core";
import { GlobalService } from "../../global.service";
import { Observable } from "rxjs";
import { tap } from "rxjs/operators";
import { LocalStorageService } from "../../local-storage.service";

@Injectable({
  providedIn: "root",
})
export class SidemenuService {
  constructor(
    private _globalService: GlobalService,
    private _localStorageService: LocalStorageService
  ) {}

  getCategories(): Observable<any> {
    return new Observable((subscriber) => {
      const categories = [
        {
          category_name: "Alimentos",
          category_icon_url: "/assets/img/category-icons/alimentos.svg",
          category_id: "Alimentos",
          category_color: "#FFF",
          category_img_url: "/assets/img/category-imgs/foodstrns.png",
        },
        {
          category_name: "Farmacia",
          category_icon_url: "/assets/img/category-icons/farmacia.svg",
          category_id: "Alimentos",
          category_color: "#46F4EA",
          category_img_url: "/assets/img/category-imgs/pharmatrns.png",
        },
        {
          category_name: "Higiene",
          category_icon_url: "/assets/img/category-icons/higiene.svg",
          category_id: "Alimentos",
          category_color: "#FFF",
          category_img_url: "/assets/img/category-imgs/hygienetrns.png",
        },
        {
          category_name: "Hogar Ropa y Accesorios",
          category_icon_url:
            "/assets/img/category-icons/hogar-ropa-accesorios.svg",
          category_id: "Alimentos",
          category_color: "#FE923A",
          category_img_url: "/assets/img/category-imgs/clothestrns.png",
        },
        {
          category_name: "Jueguetes",
          category_icon_url: "/assets/img/category-icons/juguetes.svg",
          category_id: "Alimentos",
          category_color: "#46F4EA",
          category_img_url: "/assets/img/category-imgs/toystrns.png",
        },
        {
          category_name: "PetLovers",
          category_icon_url: "/assets/img/category-icons/pet-lovers.svg",
          category_id: "Alimentos",
          category_color: "#FBA0AD",
          category_img_url: "/assets/img/category-imgs/petlovers.png",
        },
        {
          category_name: "Servicios",
          category_icon_url: "/assets/img/category-icons/servicios.svg",
          category_id: "Alimentos",
          category_color: "#46F4EA",
          category_img_url: "/assets/img/category-imgs/servicestrns.png",
        },
      ];
      this._localStorageService.setItem(
        "categories",
        JSON.stringify(categories)
      );
      subscriber.next(categories);
    });
  }
}
