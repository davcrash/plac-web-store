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
      subscriber.next([
        {
          category_name: "Alimentos",
          category_icon_url: "/assets/img/category-icons/alimentos.svg",
        },
        {
          category_name: "Farmacia",
          category_icon_url: "/assets/img/category-icons/farmacia.svg",
        },
        {
          category_name: "Higiene",
          category_icon_url: "/assets/img/category-icons/higiene.svg",
        },
        {
          category_name: "Hogar Ropa y Accesorios",
          category_icon_url:
            "/assets/img/category-icons/hogar-ropa-accesorios.svg",
        },
        {
          category_name: "Jueguetes",
          category_icon_url: "/assets/img/category-icons/juguetes.svg",
        },
        {
          category_name: "PetLovers",
          category_icon_url: "/assets/img/category-icons/pet-lovers.svg",
        },
        {
          category_name: "Servicios",
          category_icon_url: "/assets/img/category-icons/servicios.svg",
        },
      ]);
    });
  }
}
