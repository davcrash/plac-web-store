import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { HomeService } from '../services/home.service';
import { LocalStorageService } from '../../local-storage.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  @Output() public sideBarMode = new EventEmitter<any>();


  //Productos mas vendidos
  featuredProducts;
  //Empresas destacadas
  featuredPlaces;

  //var loaders
  loaderfeaturedProducts: boolean = true;
  loaderfeaturedPlaces: boolean = true;


  queEsPlacImages: Array<string> = [
    'https://picsum.photos/900/500?image=821',
    'https://picsum.photos/900/500?image=822',
    'https://picsum.photos/900/500?image=813'
  ];


  descargaLaAppImages: Array<string> = [
    '/assets/img/descarga-la-app-1.png',
    'https://picsum.photos/900/500?image=825',
    'https://picsum.photos/900/500?image=816'
  ];

  vendeEnPlacImages: Array<string> = [
    'https://picsum.photos/900/500?image=827',
    'https://picsum.photos/900/500?image=828',
    'https://picsum.photos/900/500?image=819'
  ];


  constructor(
    private _homeService: HomeService,
    private _localStorageService: LocalStorageService,
    private modalService: NgbModal
  ) { }

  ngOnInit() {
    this.sideBarMode.emit(true);

    this.getFeaturedPlaces();
    this.getFeaturedProducts();
    this._localStorageService.watchStorage().subscribe((data) => {
      if (data.change === 'pet_filter') {
        this.getFeaturedPlaces();
        this.getFeaturedProducts();
      }
    });





  }

  getFeaturedPlaces() {

    this.loaderfeaturedPlaces = true;
    //Empresas destacadas
    this._homeService.getFeaturedPlaces()
      .subscribe(places => {
        this.featuredPlaces = places;
      }, error => {
        console.log(error);
      }, () => {//Cuando ya la solicitud se completo ocultamos el loader
        this.loaderfeaturedPlaces = false;
      });

  }

  getFeaturedProducts() {
    this.loaderfeaturedProducts = true;
    //Productos mas vendidos
    this._homeService.getFeaturedProducts()
      .subscribe(products => {
        this.featuredProducts = products;
      }, error => {
        console.log(error);
      }, () => {//Cuando ya la solicitud se completo ocultamos el loader
        this.loaderfeaturedProducts = false;
      });
  }





  openModal(content) {
    this.modalService.open(content, { size: 'lg', centered: true });
  }


}
