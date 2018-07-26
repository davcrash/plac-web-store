import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {

  _opened: boolean = true;//Variable que define si el menu desplegable esta abierto o no
  showElement = true;

  constructor() {
  }


  componentAdded(event) {
    /*Cuando el componente login se muestre el retorna un true para que escondamos el menu*/
    if (event.showElements) {
      this._opened = false;
      this.showElement = false;
    } else {
      //SI no viene del componente login
      this._opened = true;
      this.showElement = true;
    }
  }


}
