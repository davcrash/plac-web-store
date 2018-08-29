import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {


  //Variable que define propiedades del menu de categorias
  _opened: boolean = false;
  _sideBarMode: string;
  _closeOutside: boolean = false;

  //Variable que define propiedades del menu de categorias
  shopCarProperties={
    _opened:false,
    _position:'right',
    _mode: 'over',
    _closeOutside:true,
    _showBackdrop:true,
    _closeOnClickBackdrop:true
  }


  //variable para mostrar elementos
  showElement: boolean = true;

  constructor() {
    //document.body.style.
    //alert(screen.width);


    localStorage.setItem("city", "2257"); //Codigo de bogota
  }


  componentAdded(event) {/*Cuando el componente login se muestre el retorna un true para que escondamos el menu*/
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


}
