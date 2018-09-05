import { Component, OnInit, Input, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { SubcategoriesService } from '../services/subcategories.service';
import { LocalStorageService } from '../../local-storage.service';

@Component({
  selector: 'app-subcategories',
  templateUrl: './subcategories.component.html',
  styleUrls: ['./subcategories.component.css']
})
export class SubcategoriesComponent implements OnChanges, OnInit {

  @Input() categoryName: string;
  @Output() public subcategorySelected = new EventEmitter<any>();
  currentSubcategorySelected 
  subcategories
  constructor(
    private _subcategoriesService: SubcategoriesService,
    private _localStorageService: LocalStorageService
  ) { }

  ngOnInit() {
    this._localStorageService.watchStorage().subscribe((data) => {
      if (data.change === 'pet_filter') {
        this.getSubCategoriesByCategoryName();
      }
    });
  }

  selectSubcategory(subcategory){
    this.currentSubcategorySelected = subcategory;
    this.subcategorySelected.emit(subcategory);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['categoryName']) {
      this.subcategories = null;
      this.categoryName = changes['categoryName'].currentValue;
      this.getSubCategoriesByCategoryName();
    }
  }

  getSubCategoriesByCategoryName() {
    this.subcategories = null;
    this._subcategoriesService.getSubCategories(this.categoryName, localStorage.getItem('pet_filter'))
      .subscribe(res => {
        this.subcategories = res;
        console.log(res);
      });
  }

}
