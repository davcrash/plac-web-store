import { Component, OnInit } from '@angular/core';
import { PlaceProfileService } from '../services/place-profile.service';
import { ActivatedRoute } from '@angular/router';
import { LocalStorageService } from '../../local-storage.service';

@Component({
  selector: 'app-place-profile',
  templateUrl: './place-profile.component.html',
  styleUrls: ['./place-profile.component.css']
})
export class PlaceProfileComponent implements OnInit {

  place: any;

  promotion: any;//avillas promocion

  arrayAssessmentStars: Array<number>;
  arrayAssessmentNoStars: Array<number>;
  deliverySchedules;
  productsCount;
  ordersCount;
  operationCities;

  categorySelected: string;
  categoryIdSelected: string;

  subcategoryIdSelected: string;
  subcategoryNameSelected: string;
  subcategorySelected: any;

  brandSelected: string;
  categoryArray;


  subcategories;


  needResetSubcategory: boolean = false;
  needResetBrand: any;

  products;
  productsPaginator;


  searchText: string;

  loaderProducts: boolean = false;
  constructor(
    private _placeProfileService: PlaceProfileService,
    private _route: ActivatedRoute,
    private _localStorageService: LocalStorageService
  ) {
  }




  ngOnInit() {
    /*
    if (!this._placeProfileService.place) {
      this.getPlaceByName();
    } else {
      this.getPlaceByName();
      //this.setPlacePropieties();
    }*/
    this.getPlaceByName();
    this._localStorageService.watchStorage().subscribe((data) => {
      //Cuando cambien el filtro de tipo de mascota
      if (data.change === 'pet_filter') {
        this.searchText = null;
        this._placeProfileService.brand = null;
        this._placeProfileService.category = null;
        this._placeProfileService.subcategoryId = null;
        this._placeProfileService.subcategoryName = null;
        this.needResetBrand += 'sub';
        this.getPlaceByName();

        this.categorySelected = null;
        this.categoryIdSelected = null;
        this.brandSelected = null;
        this.subcategoryIdSelected = null;
        this.subcategoryNameSelected = null;
        this.subcategorySelected = null;


      }
    });

  }

  getPlaceByName() {
    this.loaderProducts = true;
    this._placeProfileService.getPlaceByName(this._route.snapshot.params['name'])
      .subscribe(result => {
        this._placeProfileService.place = result.data;
        this.setPlacePropieties();
      }, error => {
        console.log(error);
      }, () => {
        //loader
      });
  }

  setPlacePropieties() {
    this.place = this._placeProfileService.place;

    if (this.place.promotion) {
      this.promotion = JSON.parse(this.place.promotion);
    }

    this.categoryArray = this.place.categories;
    //let place_description_info = this.place.place_description_info;

    this.productsCount = this.place.total_products;
    this.ordersCount = this.place.total_orders_made;
    this.operationCities = this.place.city_name;

    //para listar las estrellas
    this.arrayAssessmentStars = Array(Math.round(this.place.rating)).fill(0).map((x, i) => i);
    this.arrayAssessmentNoStars = Array(-this.arrayAssessmentStars.length + 5).fill(0).map((x, i) => i);
    this.deliverySchedules = JSON.parse(this.place.delivery_schedules);

    if (this._placeProfileService.category) {
      this.categorySelected = this._placeProfileService.category;
      let category = this.categoryArray.find(category => category.category_name === this.categorySelected);

      this.subcategories = category.subcategories;
      this.subcategoryIdSelected = this._placeProfileService.subcategoryId;
      this.subcategorySelected = this.subcategories.find(subcategory => subcategory.subcategory_id === this.subcategoryIdSelected);

      this._placeProfileService.subcategoryName = (this.subcategorySelected) ? this.subcategorySelected.subcategory_name : '';

      this.brandSelected = this._placeProfileService.brand;
      this.categoryIdSelected = category.category_id;
      this.getInitProduct();
    } else {
      let allSubcategories = [];
      this.categoryArray.forEach(element => {
        allSubcategories.push.apply(allSubcategories, element.subcategories);
      });
      this.subcategories = allSubcategories;
      this.getInitProduct();
    }



  }

  getInitProduct(searchText?) {
    this.loaderProducts = true;
    this._placeProfileService.getProducts(searchText)
      .subscribe(result => {
        this.productsPaginator = result.data;
        this.products = this.productsPaginator.data;
        this.loaderProducts = false;
      }, error => {
        console.log(error);
      }, () => {
        this.loaderProducts = false;
      });
  }


  getMoreProducts() {
    this._placeProfileService.getMoreProducts(this.productsPaginator.next_page_url, this.searchText)
      .subscribe(result => {
        this.productsPaginator = result.data;
        this.products.push.apply(this.products, this.productsPaginator.data);
      }, error => {
        console.log(error);
      }, () => {
        //loader
      });
  }

  selectBrand(event) {
    this.brandSelected = event;
    this._placeProfileService.brand = event;
    this.getInitProduct(this.searchText);
  }

  selectSubcategory(event) {
    this.searchText = null;
    let category = this.categoryArray.find(category => category.category_id === event.category_id);
    this.categoryIdSelected = event.category_id;
    this.categorySelected = category.category_name;
    this.subcategoryIdSelected = event.subcategory_id;
    this.subcategorySelected = event;
    this._placeProfileService.brand = null;
    this.brandSelected = null;
    this.needResetBrand += 'sub';
    this._placeProfileService.subcategoryId = event.subcategory_id;
    this._placeProfileService.subcategoryName = event.subcategory_name;
    this.subcategoryNameSelected = event.subcategory_name;
    this.getInitProduct();
  }

  selectCategory(categoryIn) {
    this.searchText = null;
    this.needResetSubcategory = !this.needResetSubcategory;
    this.categorySelected = categoryIn.category_name;
    this.categoryIdSelected = categoryIn.category_id;
    this.subcategoryIdSelected = null;
    this._placeProfileService.category = this.categorySelected;
    let category = this.categoryArray.find(category => category.category_name === this.categorySelected);
    this.subcategories = category.subcategories;
    this._placeProfileService.subcategoryId = null;
    this._placeProfileService.subcategoryName = null;
    this.subcategoryNameSelected = null;
    this.needResetBrand += 'sub';
    this.brandSelected = null;
    this._placeProfileService.brand = null;
    this.getInitProduct();
  }

  onEnterSearch(searchInput) {
    this.searchText = this.searchText.trim();
    if (this.searchText != '') {
      searchInput.blur();//se quita el focus del input
      this.brandSelected = null;
      this._placeProfileService.brand = null;
      this.needResetBrand += 'sch';

      this.getInitProduct(this.searchText);
    }
  }


  manageBreadcrumbs(key) {

    switch (key) {
      case 1:

        if (this.brandSelected != null && this.subcategorySelected == null && this.categorySelected == null) {
          this.brandSelected = null;
          this._placeProfileService.brand = null;
          this.needResetBrand += '1';
          this.getInitProduct();
        } else if (this.subcategorySelected != null || this.brandSelected != null || this.categorySelected != null) {
          this.subcategorySelected = null;
          this.subcategoryNameSelected = null;
          this.brandSelected = null;
          this.categorySelected = null;
          this.categoryIdSelected = null;
          this._placeProfileService.category = null;
          this._placeProfileService.subcategoryId = null;
          this._placeProfileService.subcategoryName = null;
          this._placeProfileService.brand = null;
          this.needResetSubcategory = !this.needResetSubcategory;
          this.needResetBrand = 'categoryPlaceProfile';
          this.getInitProduct();
        }
        break;
      case 2:

        if (this.subcategorySelected != null || this.brandSelected != null) {
          this.subcategorySelected = null;
          this.subcategoryIdSelected = null;
          this.subcategoryNameSelected = null;
          this.brandSelected = null;
          this._placeProfileService.subcategoryId = null;
          this._placeProfileService.subcategoryName = null;
          this._placeProfileService.brand = null;
          this.needResetBrand += 'category';
          this.needResetSubcategory = !this.needResetSubcategory;

          this.getInitProduct();
        }
        break;
      case 3:
        if (this.brandSelected != null) {
          this.brandSelected = null;
          this._placeProfileService.brand = null;
          this.needResetBrand += 'sub';
          this.getInitProduct();
        }
        break;
      case 4:
        //no hace nada
        break;

    }
  }

}
