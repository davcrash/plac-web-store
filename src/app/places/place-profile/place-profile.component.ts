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
  categorySelected: string;
  categoryIdSelected: string;
  subcategoryIdSelected: string;
  subcategorySelected: any;
  brandSelected: string;
  categoryArray;


  subcategories;


  products;
  productsPaginator;

  constructor(
    private _placeProfileService: PlaceProfileService,
    private _route: ActivatedRoute,
    private _localStorageService: LocalStorageService
  ) {
  }




  ngOnInit() {
    if (!this._placeProfileService.place) {
      this.getPlaceById();
    } else {
      this.setPlacePropieties();
    }

    this._localStorageService.watchStorage().subscribe((data) => {
      //Cuando cambien el filtro de tipo de mascota
      if (data.change === 'pet_filter') {
        this.getPlaceById();
        this.getInitProduct();
        
      }
    });

  }

  getPlaceById() {
    this._placeProfileService.getPlaceById(this._route.snapshot.params['id'])
      .subscribe(result => {
        this._placeProfileService.place = result;
        this.setPlacePropieties();
      }, error => {
        console.log(error);
      }, () => {
        //loader
      });
  }

  setPlacePropieties() {
    this.place = this._placeProfileService.place;
    this.categoryArray = this.place.categories;

    if (this._placeProfileService.category) {
      this.categorySelected = this._placeProfileService.category;
      let category = this.categoryArray.find(category => category.category_name === this.categorySelected);
      this.subcategories = category.subcategories; this.subcategoryIdSelected = this._placeProfileService.subcategoryId;
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

  getInitProduct() {
    this._placeProfileService.getProducts()
      .subscribe(result => {
        this.productsPaginator = result;
        this.products = this.productsPaginator.data;
      }, error => {
        console.log(error);
      }, () => {
        //loader
      });
  }


  getMoreProducts() {
    this._placeProfileService.getMoreProducts(this.productsPaginator.next_page_url)
      .subscribe(result => {
        this.productsPaginator = result;
        this.products.push.apply(this.products, this.productsPaginator.data);
      }, error => {
        console.log(error);
      }, () => {
        //loader
      });
  }

  selectBrand(event) {
    this._placeProfileService.brand = event;
    this.getInitProduct();
  }

  selectSubcategory(event) {
    let category = this.categoryArray.find(category => category.category_id === event.category_id);
    this.categoryIdSelected = event.category_id;
    this.categorySelected = category.category_name;
    this.subcategoryIdSelected = event.subcategory_id;
    this.subcategorySelected = event;
    this._placeProfileService.subcategoryId = event.subcategory_id;
    this._placeProfileService.subcategoryName = event.subcategory_name;
    this.getInitProduct();
  }

  selectCategory(categoryIn) {
    this.categorySelected = categoryIn.category_name;
    this.categoryIdSelected = categoryIn.category_id;
    this._placeProfileService.category = this.categorySelected;
    let category = this.categoryArray.find(category => category.category_name === this.categorySelected);
    this.subcategories = category.subcategories;
    this._placeProfileService.subcategoryId = null;
    this._placeProfileService.subcategoryName = null;
    this._placeProfileService.brand = null;
    this.getInitProduct();
  }

}
