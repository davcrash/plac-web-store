import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {

  _opened: boolean = true;//Variable que define si el menu desplegable esta abierto o no
  _navBarMode: string;
  showElement:boolean = true;
  _closeOutside:boolean = false;

  constructor() {
    localStorage.setItem("city", "2257"); //Codigo de bogota
  }


  componentAdded(event) {/*Cuando el componente login se muestre el retorna un true para que escondamos el menu*/
    if (event.showElements) {
      this._opened = false;
      this.showElement = false;
    } else {

      this.showElement = true;
      //Si no viene del componente login
      if (event.navBarMode) {//si esta en el home emite un evento true para que el navbar no se sobreponga
        this._opened = true;
        this._navBarMode = 'push';
        this._closeOutside = false;
      } else {//si no esta en el home se sobrepone
        this._opened = false;
        this._navBarMode = 'over';
        this._closeOutside = true;
      }
    }
  }


}
