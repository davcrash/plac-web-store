import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.css']
})
export class BannerComponent implements OnInit {

  imageUrls = [
    { url: 'https://res.cloudinary.com/plac-web/image/upload/v1548875912/page/banners/pieza-banner-web-avplac.jpg' }
  ];

  constructor() { }

  ngOnInit() {
  }

}
