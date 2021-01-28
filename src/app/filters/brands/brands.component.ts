import {
  Component,
  OnInit,
  Input,
  OnChanges,
  SimpleChanges,
  Output,
  EventEmitter,
} from "@angular/core";
import { BrandsService } from "../services/brands.service";
import { LocalStorageService } from "../../local-storage.service";

@Component({
  selector: "app-brands",
  templateUrl: "./brands.component.html",
  styleUrls: ["./brands.component.css"],
})
export class BrandsComponent implements OnInit, OnChanges {
  @Input() categoryId: string;
  @Input() subcategoryId: string;
  @Input() placeId?: string;
  @Input() preBrandSelected?: string;

  @Input() search?: string;

  @Input() needReset?: boolean = false;

  @Output() public brandSelected = new EventEmitter<any>();

  brands;
  loader: boolean = true;
  productBrandSelected: string;

  constructor(
    private _brandsService: BrandsService,
    private _localStorageService: LocalStorageService
  ) {}

  ngOnInit() {
    this._localStorageService.watchStorage().subscribe((data) => {
      //Cuando cambien el filtro de tipo de mascota
      if (data.change === "pet_filter") {
        this.loader = true;
        this.getBrands();
      }
    });
    this.productBrandSelected = this.preBrandSelected;
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes["needReset"]) {
      this.productBrandSelected = null;
      if (changes["needReset"].currentValue == "category") {
        this.loader = true;
        this.subcategoryId = null;
        this.getBrands();
      } else if (changes["needReset"].currentValue == "categoryPlaceProfile") {
        this.loader = true;
        this.subcategoryId = null;
        this.categoryId = null;
        this.getBrands();
      } else if (
        (changes["needReset"].currentValue
          ? changes["needReset"].currentValue.slice(-3)
          : "") == "sch"
      ) {
        this.getBrands(this.search);
      }
    }

    let flag = 0;
    if (changes["categoryId"] && this.categoryId != "") {
      this.productBrandSelected = null;
      this.loader = true;
      this.subcategoryId = null;
      this.categoryId = changes["categoryId"].currentValue;
      flag += 1;
    }
    if (changes["subcategoryId"]) {
      this.productBrandSelected = null;
      this.subcategoryId = changes["subcategoryId"].currentValue;
      this.loader = true;
      flag += 1;
    }
    flag >= 1 ? this.getBrands() : "";
  }

  getBrands(search?) {
    this._brandsService
      .getBrands(
        this.categoryId,
        localStorage.getItem("pet_filter"),
        this.subcategoryId,
        this.placeId,
        search
      )
      .subscribe(
        (res) => {
          this.brands = res;
          this.loader = false;
        },
        (error) => {
          console.log(error);
        },
        () => {
          //Cuando ya la solicitud se completo ocultamos el loader
        }
      );
  }

  selectBrand(brand) {
    this.productBrandSelected = brand;
    this.brandSelected.emit(this.productBrandSelected);
  }
}
