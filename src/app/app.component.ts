import { Component, ViewChild, AfterViewChecked } from '@angular/core';
import { SellInService } from './main/landing/sell-in/sell-in.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {

  @ViewChild('contentPages') contentPages;
  //Variable que define propiedades del menu de categorias

  _opened: boolean = false;
  _sideBarMode: string;
  _closeOutside: boolean = false;

  //Variable que define propiedades del menu de categorias
  shopCarProperties = {
    _opened: false,
    _position: 'right',
    _mode: 'over',
    _closeOutside: false,
    _showBackdrop: true,
    _closeOnClickBackdrop: true
  }

  openModal: boolean = true;

  //variable para mostrar elementos
  showElement: boolean = true;

  //variable para saber si esta en vende en plac
  isInSellIn: boolean = false;

  constructor(private _sellInService: SellInService) {
    //document.body.style.
    //alert(screen.width);
    setTimeout(() => {
      (window.innerWidth >= 576) ? '' : this._opened = false;
    });
    
    this.openModal = (sessionStorage.getItem('download-modal') == null);

    //localStorage.setItem("city", "2257"); //Codigo de bogota
  }

  closeDownloadModal() {
    this.openModal = false;
    sessionStorage.setItem('download-modal', 'true');
  }

  closeShopCart() {
    this.shopCarProperties._opened = false;
  }


  componentAdded(event) {/*Cuando el componente login se muestre el retorna un true para que escondamos el menu*/
    /*
    this.contentPages.nativeElement.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });*/
    this.contentPages.nativeElement.scrollTop = 0;//para que cuando se cambia de pagina se ponga en el principio


    if (event.isInSellIn) {//si esta en el componente de vende en plac
      this.isInSellIn = true;
    } else {
      this.isInSellIn = false;
    }

    if (event.showElements) {
      this._opened = false;
      this.showElement = false;
    } else {

      this.showElement = true;
      //Si no viene del componente login
      if (event.sideBarMode) {//si esta en el home emite un evento true para que el navbar no se sobreponga
        this._opened = true;
        this._sideBarMode = 'push';
        this._closeOutside = false;
      } else {//si no esta en el home se sobrepone
        this._opened = false;
        this._sideBarMode = 'over';
        this._closeOutside = true;
      }
    }
  }

  manageScroll() {
    if (this.isInSellIn) {
      this._sellInService.setScrollValue(this.contentPages.nativeElement.scrollTop);
    }
  }


  goTo(where) {
    let windowRef = window;
    switch (where) {
      case 'facebook':
        windowRef.open("https://www.facebook.com/placoficial/", "_blank");
        break;
      case 'instagram':
        windowRef.open("https://www.instagram.com/placoficial/", "_blank");
        break;
      case 'twitter':
        windowRef.open("https://twitter.com/placapp", "_blank");
        break;
      case 'pinterest':
        windowRef.open("https://co.pinterest.com/placapp/", "_blank");
        break;
    }
  }


}
