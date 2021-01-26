import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { SearchService } from "../services/search.service";
import { LocalStorageService } from "../../local-storage.service";

@Component({
  selector: "app-search",
  templateUrl: "./search.component.html",
  styleUrls: ["./search.component.css"],
})
export class SearchComponent implements OnInit {
  queryText: string;

  orderByPrice: string;
  paymentTypeFilter: string;

  placesWithProducts: any;
  placesWithProductsLenght: number;
  placesWithProductsPaginator: any;

  loader: boolean = true;
  constructor(
    private _route: ActivatedRoute,
    private _searchService: SearchService,
    private _localStorageService: LocalStorageService
  ) {}

  ngOnInit() {
    this._route.queryParamMap.subscribe((params) => {
      this.queryText = params.get("queryText");
      //reiniciamos filtros de la vista
      this.orderByPrice = null;
      this.paymentTypeFilter = null;

      //obtenemos las empresas con los productos
      this.getPlacesWithProductsBySearch(this.queryText);
    });
    this._localStorageService.watchStorage().subscribe((data) => {
      //Cuando cambien el filtro de tipo de mascota
      if (data.change === "pet_filter") {
        this.orderByPrice = null;
        this.paymentTypeFilter = null;
        this.getPlacesWithProductsBySearch(this.queryText);
      }
    });
  }

  getPlacesWithProductsBySearch(queryText) {
    this.loader = true;
    this._searchService
      .getSearchPlacesProducts(
        queryText,
        this.orderByPrice,
        this.paymentTypeFilter
      )
      .subscribe(
        (result) => {
          this.placesWithProductsPaginator = result.next_page_url;
          this.placesWithProducts = result;
          this.placesWithProductsLenght = this.placesWithProducts.length;

          this.loader = false;
        },
        (error) => {
          console.log(error);
        }
      );
  }

  getMorePlacesWithProductsBySearch() {
    this._searchService
      .getMorePlacesWithProducts(
        this.placesWithProductsPaginator,
        this.queryText,
        this.orderByPrice,
        this.paymentTypeFilter
      )
      .subscribe(
        (result) => {
          this.placesWithProductsPaginator = result.data.next_page_url;
          this.placesWithProducts.push.apply(
            this.placesWithProducts,
            result.data.data
          );
        },
        (error) => {
          console.log(error);
        },
        () => {
          //Cuando ya la solicitud se completo ocultamos el loader
          //loader
        }
      );
  }

  onChangePrice() {
    this.getPlacesWithProductsBySearch(this.queryText);
  }
  onChangePaymentType() {
    this.getPlacesWithProductsBySearch(this.queryText);
  }
}
