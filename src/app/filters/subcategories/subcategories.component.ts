import { Component, OnInit, Input, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { SubcategoriesService } from '../services/subcategories.service';
import { LocalStorageService } from '../../local-storage.service';

@Component({
  selector: 'app-subcategories',
  templateUrl: './subcategories.component.html',
  styleUrls: ['./subcategories.component.css']
})
export class SubcategoriesComponent implements OnChanges, OnInit {

  loader: boolean = true;

  @Input() categoryName: string;


  @Input() preLoadSubcategories?: any;
  @Input() preLoadSelected?: any;


  @Output() public subcategorySelected = new EventEmitter<any>();

  @Input() needReset?: boolean = false;

  currentSubcategorySelected
  subcategories

  constructor(
    private _subcategoriesService: SubcategoriesService,
    private _localStorageService: LocalStorageService
  ) { }

  ngOnInit() {
    this._localStorageService.watchStorage().subscribe((data) => {
      if (data.change === 'pet_filter') {
        this.loader = true;
        this.getSubCategoriesByCategoryName();
      }
    });
  }

  selectSubcategory(subcategory) {
    this.currentSubcategorySelected = subcategory;
    this.subcategorySelected.emit(subcategory);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['needReset']) {
      this.currentSubcategorySelected = null;
    }
    if (changes['categoryName']) {
      this.subcategories = null;
      this.categoryName = changes['categoryName'].currentValue;
      this.loader = true;
      this.getSubCategoriesByCategoryName();
    }
  }

  getSubCategoriesByCategoryName() {
    if (this.preLoadSubcategories) {
      this.subcategories = this.preLoadSubcategories;
      this.currentSubcategorySelected = (this.preLoadSelected) ? this.preLoadSelected : '';
      this.loader = false;
    } else {
      this.subcategories = null;
      this._subcategoriesService.getSubCategories(this.categoryName, localStorage.getItem('pet_filter'))
        .subscribe(res => {
          this.subcategories = res;
        }, error => {
          console.log(error);
        }, () => {
          this.loader = false;
        });
    }
  }

}
