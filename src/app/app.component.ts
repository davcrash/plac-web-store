import { Component, ViewChild } from '@angular/core';

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


  //variable para mostrar elementos
  showElement: boolean = true;

  constructor() {
    //document.body.style.
    //alert(screen.width);


    localStorage.setItem("city", "2257"); //Codigo de bogota
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


  goTo(where) {
    let windowRef = window;
    switch (where) {
      case 'download':
        windowRef.open("https://play.google.com/store/apps/details?id=com.placapp", "_blank");
        break;
    }
  }


}
