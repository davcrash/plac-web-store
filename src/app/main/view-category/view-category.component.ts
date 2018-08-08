import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: 'app-view-category',
  templateUrl: './view-category.component.html',
  styleUrls: ['./view-category.component.css']
})
export class ViewCategoryComponent implements OnInit {


  //CategoryReceivedByRoute = this._route.snapshot.params['category_name'];
  CategoryReceivedByRoute;//category_name


  placesWithProducts = [
    {
      place_name: 'tienda1',
      products:[
        {product_name:'producto1'},
        {product_name:'producto2'},
        {product_name:'producto3'},
        {product_name:'producto4'},
        {product_name:'producto4'},
        {product_name:'producto4'},
        {product_name:'producto4'},
        {product_name:'producto4'},
        {product_name:'producto4'},
      ]
    },
  ];


  constructor(
    private _route: ActivatedRoute,
    private _navigate: Router
  ) { }

  ngOnInit() {
    this._route.params.subscribe(routeParam => {
      this.CategoryReceivedByRoute = routeParam.category_name;
    });


  }

}
